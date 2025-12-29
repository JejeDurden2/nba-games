import { useRef, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { useIsMobile } from './hooks/useMediaQuery';
import { BackgroundEffects } from './components/ui/BackgroundEffects';
import { MenuScreen } from './components/screens/MenuScreen';
import { PlayingScreen } from './components/screens/PlayingScreen';
import { WonScreen } from './components/screens/WonScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';
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
    playerName,
    leaderboard,
    answerName,
    error,
    isGameOver,
    failuresThisRound,
    difficulty,
    questionsAtDifficulty,
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
    <div className="bg-dark-900 min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Content Container */}
        <div
          className={cn(
            'mx-auto',
            isMobile ? 'px-4 py-6 max-w-2xl' : 'px-6 py-8 max-w-4xl'
          )}
        >
          {/* Header */}
          <header className="text-center mb-8">
            <h1
              onClick={
                gameState === 'menu' || gameState === 'loading'
                  ? undefined
                  : resetToMenu
              }
              className={cn(
                'font-black tracking-tight',
                isMobile ? 'text-4xl' : 'text-5xl',
                gameState !== 'menu' &&
                  gameState !== 'loading' &&
                  'cursor-pointer hover:opacity-80 transition-opacity'
              )}
            >
              <span
                className="bg-gradient-fire bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                NBA
              </span>
              <span className="text-white"> WHO AM I</span>
              <span className="text-ball-400">?</span>
            </h1>
          </header>

          {/* Game Screens */}
          {(gameState === 'menu' || gameState === 'loading') && (
            <MenuScreen
              playerName={playerName}
              setPlayerName={setPlayerName}
              startGame={startGame}
              leaderboard={leaderboard}
              error={error}
              isLoading={gameState === 'loading'}
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
              startGame={startGame}
              resetToMenu={resetToMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
