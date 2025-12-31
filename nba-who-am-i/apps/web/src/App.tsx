import { useRef, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { useIsMobile } from './hooks/useMediaQuery';
import { BackgroundEffects } from './components/ui/BackgroundEffects';
import { Header } from './components/ui/Header';
import { MenuScreen } from './components/screens/MenuScreen';
import { LoadingScreen } from './components/screens/LoadingScreen';
import { PlayingScreen } from './components/screens/PlayingScreen';
import { WonScreen } from './components/screens/WonScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { Footer } from './components/ui/Footer';
import { cn } from './lib/design-system/utils';

/**
 * Main application component
 * Orchestrates game flow and renders appropriate screens based on game state
 */
export default function App() {
  const {
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
    answerName,
    error,
    isGameOver,
    failuresThisRound,
    difficulty,
    questionsAtDifficulty,
    highestLevelCleared,
    allLevelsCleared,
    playerPercentile,
    totalPlayers,
    isLeaderboardLoading,
    setGuess,
    setPlayerName,
    startGame,
    submitGuess,
    resetToMenu,
    stopGame,
    calculatePotentialScore,
  } = useGame();

  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Auto-focus input when playing
  useEffect(() => {
    if (gameState === 'playing') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  const characterType = character?.type || 'player';

  return (
    <div className="bg-dark-900 min-h-screen text-white font-sans relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Content Container */}
        <div
          className={cn(
            'mx-auto flex-1',
            isMobile ? 'px-4 py-6 max-w-2xl' : 'px-6 py-8 max-w-4xl'
          )}
        >
          {/* Header - compact during gameplay */}
          {gameState !== 'loading' && (
            <Header
              onClick={resetToMenu}
              clickable={gameState !== 'menu'}
              compact={gameState === 'playing'}
            />
          )}

          {/* Game Screens */}
          {gameState === 'loading' && <LoadingScreen />}

          {gameState === 'menu' && (
            <MenuScreen
              playerName={playerName}
              setPlayerName={setPlayerName}
              startGame={startGame}
              leaderboard={leaderboard}
              error={error}
              isLoading={false}
              isLeaderboardLoading={isLeaderboardLoading}
            />
          )}

          {gameState === 'playing' && character && (
            <PlayingScreen
              displayedText={displayedText}
              timeLeft={timeLeft}
              characterType={characterType}
              calculatePotentialScore={calculatePotentialScore}
              guess={guess}
              setGuess={setGuess}
              submitGuess={submitGuess}
              wrongGuess={wrongGuess}
              correctGuess={correctGuess}
              inputRef={inputRef}
              onQuit={stopGame}
              round={round}
              streak={streak}
              totalScore={totalScore}
              failuresThisRound={failuresThisRound}
              difficulty={difficulty}
              questionsAtDifficulty={questionsAtDifficulty}
            />
          )}

          {gameState === 'won' && !isGameOver && (
            <WonScreen
              answerName={answerName}
              score={score}
              streak={streak}
              startGame={startGame}
              resetToMenu={resetToMenu}
            />
          )}

          {gameState === 'lost' && (
            <GameOverScreen
              answerName={answerName}
              totalScore={totalScore}
              round={round}
              maxStreak={maxStreak}
              isTimeout={timeLeft === 0 && failuresThisRound < 3}
              difficulty={difficulty}
              highestLevelCleared={highestLevelCleared}
              allLevelsCleared={allLevelsCleared}
              playerPercentile={playerPercentile}
              totalPlayers={totalPlayers}
              playerName={playerName}
              startGame={startGame}
              resetToMenu={resetToMenu}
            />
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
