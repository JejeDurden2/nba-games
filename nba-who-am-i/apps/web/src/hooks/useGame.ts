import { useState, useEffect, useRef, useCallback } from 'react';
import { gameApi, GameCharacter, LeaderboardEntry } from '../api/game';
import { fuzzyMatch } from '../lib/fuzzy-match';

export type GameState = 'menu' | 'loading' | 'playing' | 'won' | 'lost';

interface UseGameReturn {
  // State
  gameState: GameState;
  character: GameCharacter | null;
  displayedText: string;
  timeLeft: number;
  score: number;
  totalScore: number;
  streak: number;
  maxStreak: number;
  round: number;
  guess: string;
  wrongGuess: boolean;
  correctGuess: boolean;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  showLeaderboard: boolean;
  answerName: string;
  error: string | null;
  isGameOver: boolean;
  usedCharacterIds: string[];
  failuresThisRound: number;
  difficulty: number;
  questionsAtDifficulty: number;
  highestLevelCleared: number;
  allLevelsCleared: boolean;
  playerPercentile?: number;
  totalPlayers?: number;
  isLeaderboardLoading: boolean;
  currentHintIndex: number;

  // Actions
  setGuess: (guess: string) => void;
  setPlayerName: (name: string) => void;
  setShowLeaderboard: (show: boolean) => void;
  startGame: () => Promise<void>;
  submitGuess: () => Promise<void>;
  resetToMenu: () => void;
  stopGame: () => void;
  calculatePotentialScore: (time: number, hintIndex?: number) => number;
  refreshLeaderboard: () => Promise<void>;
}

export function useGame(): UseGameReturn {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [character, setCharacter] = useState<GameCharacter | null>(null);
  const [usedCharacterIds, setUsedCharacterIds] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [wrongGuess, setWrongGuess] = useState(false);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [answerName, setAnswerName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [failuresThisRound, setFailuresThisRound] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [questionsAtDifficulty, setQuestionsAtDifficulty] = useState(0);
  const [highestLevelCleared, setHighestLevelCleared] = useState(0);
  const [playerPercentile, setPlayerPercentile] = useState<number | undefined>(
    undefined
  );
  const [totalPlayers, setTotalPlayers] = useState<number | undefined>(
    undefined
  );
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const nextCharacterRef = useRef<GameCharacter | null>(null);

  // Hint-based scoring: score decreases as more hints are revealed
  // Score values: 1000 (hint 1) → 800 (hint 2) → 600 (hint 3) → 400 (hint 4) → 200 (hint 5+)
  const calculatePotentialScore = useCallback(
    (_time: number, hintIndex?: number): number => {
      const idx = hintIndex ?? currentHintIndex;
      if (idx === 0) return 1000;
      if (idx === 1) return 800;
      if (idx === 2) return 600;
      if (idx === 3) return 400;
      return 200;
    },
    [currentHintIndex]
  );

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (textIntervalRef.current) {
      clearInterval(textIntervalRef.current);
      textIntervalRef.current = null;
    }
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    setIsLeaderboardLoading(true);
    try {
      const res = await gameApi.getLeaderboard(10);
      setLeaderboard(res.entries);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setIsLeaderboardLoading(false);
    }
  }, []);

  // Load leaderboard on mount
  useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

  // Fetch percentile on game over
  const fetchPercentile = useCallback(async (score: number) => {
    try {
      const res = await gameApi.getLeaderboard(10, score);
      setPlayerPercentile(res.playerPercentile);
      setTotalPlayers(res.totalPlayers);
    } catch (err) {
      console.error('Failed to fetch percentile:', err);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimers();
          setMaxStreak((ms) => Math.max(ms, streak));
          setStreak(0);
          setIsGameOver(true);
          if (character) {
            setAnswerName(character.name);
          }
          setGameState('lost');
          // Fetch percentile when losing
          fetchPercentile(totalScore);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return clearTimers;
  }, [gameState, clearTimers, streak, totalScore, fetchPercentile, character]);

  // Text reveal effect with QPUC-style timing
  // - Faster typing (20ms per character)
  // - Pause between hints (800ms)
  // - All hints finish with 5 seconds remaining
  useEffect(() => {
    if (gameState !== 'playing' || !character) return;

    const TOTAL_TIME = 30; // seconds
    const RESERVE_TIME = 5; // seconds to leave at end
    const AVAILABLE_TIME = (TOTAL_TIME - RESERVE_TIME) * 1000; // 25 seconds in ms
    const CHAR_SPEED = 20; // ms per character (faster typing)
    const HINT_PAUSE = 800; // ms pause between hints

    // Calculate total characters and timing
    const hints = character.hints;
    const totalChars = hints.reduce((sum, h) => sum + h.length, 0);
    const totalPauses = Math.max(0, hints.length - 1);
    const totalPauseTime = totalPauses * HINT_PAUSE;
    const totalTypingTime = totalChars * CHAR_SPEED;
    const totalRevealTime = totalTypingTime + totalPauseTime;

    // Calculate delay before starting (to finish with 5s left)
    const startDelay = Math.max(0, AVAILABLE_TIME - totalRevealTime);

    let fullText = '';
    let hintIdx = 0;
    let charIdx = 0;
    let isPaused = false;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const reveal = () => {
      if (isPaused) return;

      if (hintIdx >= hints.length) {
        if (textIntervalRef.current) clearInterval(textIntervalRef.current);
        return;
      }

      const hint = hints[hintIdx];
      if (charIdx < hint.length) {
        fullText += hint[charIdx];
        setDisplayedText(fullText);
        charIdx++;
      } else {
        // Hint complete - update hint index for scoring
        setCurrentHintIndex(hintIdx + 1);

        // Check if there are more hints
        if (hintIdx < hints.length - 1) {
          fullText += '\n\n';
          hintIdx++;
          charIdx = 0;

          // Pause before next hint
          isPaused = true;
          pauseTimeout = setTimeout(() => {
            isPaused = false;
          }, HINT_PAUSE);
        } else {
          // All hints revealed
          if (textIntervalRef.current) clearInterval(textIntervalRef.current);
        }
      }
    };

    // Start after calculated delay
    const startTimeout = setTimeout(() => {
      textIntervalRef.current = setInterval(reveal, CHAR_SPEED);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    };
  }, [gameState, character]);

  const startGame = useCallback(async () => {
    setError(null);

    // Check if we have a prefetched character
    if (nextCharacterRef.current) {
      // Use prefetched character - instant transition!
      const prefetchedCharacter = nextCharacterRef.current;
      nextCharacterRef.current = null;

      // Clear any existing timers before setting new character
      clearTimers();

      // Don't reset sessionId - keep the same session throughout the game
      setDisplayedText('');
      setCharacter(prefetchedCharacter);
      setUsedCharacterIds((prev) => [...prev, prefetchedCharacter.id]);
      setTimeLeft(30);
      setScore(0);
      setGuess('');
      setRound((r) => r + 1);
      setIsGameOver(false);
      setFailuresThisRound(0);
      setCurrentHintIndex(0);
      startTimeRef.current = Date.now();
      setGameState('playing');
      return;
    }

    // No prefetched character - show loading and fetch
    setGameState('loading');

    try {
      // Reset used IDs if we've used too many (to avoid running out)
      let idsToExclude = usedCharacterIds;
      if (usedCharacterIds.length >= 25) {
        idsToExclude = [];
        setUsedCharacterIds([]);
      }

      const response = await gameApi.startGame(
        playerName || 'Anonymous',
        idsToExclude,
        difficulty
      );

      setSessionId(response.sessionId);
      setCharacter(response.character);
      setUsedCharacterIds((prev) => [...prev, response.character.id]);
      setDisplayedText('');
      setTimeLeft(30);
      setScore(0);
      setGuess('');
      setRound((r) => r + 1);
      setIsGameOver(false);
      setFailuresThisRound(0);
      setCurrentHintIndex(0);
      startTimeRef.current = Date.now();
      setGameState('playing');
    } catch (err) {
      setError('Impossible de démarrer la partie. Vérifiez votre connexion.');
      setGameState('menu');
      console.error(err);
    }
  }, [playerName, usedCharacterIds, clearTimers, difficulty]);

  const submitGuess = useCallback(async () => {
    if (
      !guess.trim() ||
      gameState !== 'playing' ||
      !character ||
      !sessionId ||
      failuresThisRound >= 3
    )
      return;

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    // Client-side fuzzy matching for instant feedback
    const isCorrect = fuzzyMatch(guess.trim(), character.name);

    if (!isCorrect) {
      // Wrong answer - increment failure count
      const newFailures = failuresThisRound + 1;
      setFailuresThisRound(newFailures);

      // Check if 3 strikes = game over
      if (newFailures >= 3) {
        clearTimers();
        setMaxStreak((ms) => Math.max(ms, streak));
        setStreak(0);
        setIsGameOver(true);
        setAnswerName(character.name);
        setGameState('lost');
        // Fetch percentile when losing
        fetchPercentile(totalScore);
        return;
      }

      // Otherwise show wrong answer feedback
      setTimeLeft((t) => Math.max(0, t - 3));
      setWrongGuess(true);
      // Delay clearing input until after shake animation completes
      setTimeout(() => {
        setGuess('');
        setWrongGuess(false);
      }, 500);
      return;
    }

    // Correct answer - show success feedback first
    clearTimers();
    setAnswerName(character.name);
    setCorrectGuess(true);

    // Reset failure count for next round
    setFailuresThisRound(0);

    // Check difficulty progression (5 questions per difficulty level)
    const newQuestionsAtDifficulty = questionsAtDifficulty + 1;
    setQuestionsAtDifficulty(newQuestionsAtDifficulty);

    // Level up after 5 questions at current difficulty (max difficulty is 5)
    if (newQuestionsAtDifficulty >= 5 && difficulty < 5) {
      // Track that we cleared this level
      setHighestLevelCleared(difficulty);
      setDifficulty(difficulty + 1);
      setQuestionsAtDifficulty(0);
    } else if (newQuestionsAtDifficulty >= 5 && difficulty === 5) {
      // Cleared the final level!
      setHighestLevelCleared(5);
    }

    // Calculate estimated score based on time
    const estimatedScore = calculatePotentialScore(30 - timeSpent);
    const estimatedStreak = streak + 1;
    const streakBonus =
      streak > 0 ? Math.round(estimatedScore * (streak * 0.15)) : 0;
    const estimatedTotalScore = estimatedScore + streakBonus;

    // Brief delay to show success feedback before transitioning
    setTimeout(() => {
      setCorrectGuess(false);
      // Show success screen with estimated values
      setScore(estimatedTotalScore);
      setTotalScore(totalScore + estimatedTotalScore);
      setStreak(estimatedStreak);
      setMaxStreak((ms) => Math.max(ms, estimatedStreak));
      setIsGameOver(false);
      setGameState('won');
    }, 600);

    // Submit to backend in background to get real score and update leaderboard
    // Also prefetch next character for instant transition
    try {
      const [response] = await Promise.all([
        gameApi.submitAnswer({
          sessionId,
          characterId: character.id,
          guess: guess.trim(),
          timeSpent,
          playerName: playerName || 'Anonymous',
        }),
        // Prefetch next character in background
        (async () => {
          const idsToExclude = [...usedCharacterIds, character.id];
          // Use the updated difficulty after level up
          const nextDifficulty =
            newQuestionsAtDifficulty >= 5 && difficulty < 5
              ? difficulty + 1
              : difficulty;
          const nextResponse = await gameApi.startGame(
            playerName || 'Anonymous',
            idsToExclude,
            nextDifficulty
          );
          nextCharacterRef.current = nextResponse.character;
        })(),
      ]);

      // Update with real values from backend (usually same as estimate)
      setScore(response.score);
      setTotalScore(response.totalScore);
      setStreak(response.streak);
      setMaxStreak((ms) => Math.max(ms, response.streak));

      // Refresh leaderboard
      refreshLeaderboard();
    } catch (err) {
      console.error('Failed to submit score or prefetch next:', err);
      // Keep the optimistic values, just log the error
      // The game continues normally even if the API fails
    }
  }, [
    guess,
    gameState,
    character,
    sessionId,
    playerName,
    clearTimers,
    refreshLeaderboard,
    calculatePotentialScore,
    streak,
    totalScore,
    usedCharacterIds,
    failuresThisRound,
    questionsAtDifficulty,
    difficulty,
    fetchPercentile,
  ]);

  const resetToMenu = useCallback(() => {
    clearTimers();
    setGameState('menu');
    setTotalScore(0);
    setStreak(0);
    setMaxStreak(0);
    setRound(0);
    setUsedCharacterIds([]);
    setCharacter(null);
    setSessionId(null);
    setIsGameOver(false);
    setFailuresThisRound(0);
    setCurrentHintIndex(0);
    setDifficulty(1);
    setQuestionsAtDifficulty(0);
    setHighestLevelCleared(0);
    setPlayerPercentile(undefined);
    setTotalPlayers(undefined);
    refreshLeaderboard();
  }, [clearTimers, refreshLeaderboard]);

  const stopGame = useCallback(() => {
    clearTimers();
    setMaxStreak((ms) => Math.max(ms, streak));
    setIsGameOver(true);
    setGameState('lost');
  }, [clearTimers, streak]);

  const allLevelsCleared = highestLevelCleared >= 5;

  return {
    gameState,
    character,
    displayedText,
    timeLeft,
    score,
    totalScore,
    streak,
    maxStreak,
    round,
    guess,
    wrongGuess,
    correctGuess,
    playerName,
    leaderboard,
    showLeaderboard,
    answerName,
    error,
    isGameOver,
    usedCharacterIds,
    failuresThisRound,
    difficulty,
    questionsAtDifficulty,
    highestLevelCleared,
    allLevelsCleared,
    playerPercentile,
    totalPlayers,
    isLeaderboardLoading,
    currentHintIndex,
    setGuess,
    setPlayerName,
    setShowLeaderboard,
    startGame,
    submitGuess,
    resetToMenu,
    stopGame,
    calculatePotentialScore,
    refreshLeaderboard,
  };
}
