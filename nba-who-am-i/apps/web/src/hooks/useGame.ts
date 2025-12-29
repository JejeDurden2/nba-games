import { useState, useEffect, useRef, useCallback } from 'react';
import { gameApi, GameCharacter, LeaderboardEntry } from '../api/game';

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
  playerName: string;
  leaderboard: LeaderboardEntry[];
  showLeaderboard: boolean;
  answerName: string;
  error: string | null;
  isGameOver: boolean;
  usedCharacterIds: string[];
  isSubmitting: boolean;

  // Actions
  setGuess: (guess: string) => void;
  setPlayerName: (name: string) => void;
  setShowLeaderboard: (show: boolean) => void;
  startGame: () => Promise<void>;
  submitGuess: () => Promise<void>;
  resetToMenu: () => void;
  stopGame: () => void;
  calculatePotentialScore: (time: number) => number;
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
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [answerName, setAnswerName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const calculatePotentialScore = useCallback((time: number): number => {
    if (time > 25) return 1000;
    if (time > 20) return 800;
    if (time > 15) return 600;
    if (time > 10) return 400;
    if (time > 5) return 200;
    return 100;
  }, []);

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
    try {
      const res = await gameApi.getLeaderboard(10);
      setLeaderboard(res.entries);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    }
  }, []);

  // Load leaderboard on mount
  useEffect(() => {
    refreshLeaderboard();
  }, [refreshLeaderboard]);

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
          setGameState('lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return clearTimers;
  }, [gameState, clearTimers, streak]);

  // Text reveal effect
  useEffect(() => {
    if (gameState !== 'playing' || !character) return;

    let fullText = '';
    let hintIdx = 0;
    let charIdx = 0;

    const reveal = () => {
      if (hintIdx >= character.hints.length) {
        if (textIntervalRef.current) clearInterval(textIntervalRef.current);
        return;
      }

      const hint = character.hints[hintIdx];
      if (charIdx < hint.length) {
        fullText += hint[charIdx];
        setDisplayedText(fullText);
        charIdx++;
      } else {
        fullText += '\n\n';
        hintIdx++;
        charIdx = 0;
      }
    };

    textIntervalRef.current = setInterval(reveal, 18);

    return () => {
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    };
  }, [gameState, character]);

  const startGame = useCallback(async () => {
    setError(null);
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
        idsToExclude
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
      startTimeRef.current = Date.now();
      setGameState('playing');
    } catch (err) {
      setError('Impossible de démarrer la partie. Vérifiez votre connexion.');
      setGameState('menu');
      console.error(err);
    }
  }, [playerName, usedCharacterIds]);

  const submitGuess = useCallback(async () => {
    if (
      !guess.trim() ||
      gameState !== 'playing' ||
      !character ||
      !sessionId ||
      isSubmitting
    )
      return;

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    setIsSubmitting(true);

    try {
      const response = await gameApi.submitAnswer({
        sessionId,
        characterId: character.id,
        guess: guess.trim(),
        timeSpent,
        playerName: playerName || 'Anonymous',
      });

      setAnswerName(response.answer);

      if (response.correct) {
        clearTimers();
        setScore(response.score);
        setTotalScore(response.totalScore);
        setStreak(response.streak);
        setMaxStreak((ms) => Math.max(ms, response.streak));
        setIsGameOver(false);
        setGameState('won');

        // Refresh leaderboard
        refreshLeaderboard();
      } else {
        setGuess('');
        setTimeLeft((t) => Math.max(0, t - 3));
        setWrongGuess(true);
        setTimeout(() => setWrongGuess(false), 400);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    guess,
    gameState,
    character,
    sessionId,
    playerName,
    isSubmitting,
    clearTimers,
    refreshLeaderboard,
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
    refreshLeaderboard();
  }, [clearTimers, refreshLeaderboard]);

  const stopGame = useCallback(() => {
    clearTimers();
    setMaxStreak((ms) => Math.max(ms, streak));
    setIsGameOver(true);
    setGameState('lost');
  }, [clearTimers, streak]);

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
    playerName,
    leaderboard,
    showLeaderboard,
    answerName,
    error,
    isGameOver,
    usedCharacterIds,
    isSubmitting,
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
