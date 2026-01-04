import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AchievementGrid } from '@/components/game/AchievementGrid';
import { ShareCard } from '@/components/game/ShareCard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useWording } from '@/contexts/UniverseContext';
import { t } from '@/lib/universe/interpolate';

export interface GameOverScreenProps {
  answerName: string;
  totalScore: number;
  round: number;
  maxStreak: number;
  isTimeout: boolean;
  startGame: () => void;
  resetToMenu: () => void;
  difficulty: number;
  highestLevelCleared: number;
  allLevelsCleared: boolean;
  playerPercentile?: number;
  totalPlayers?: number;
  playerName: string;
}

import type { EncouragingMessagesWording } from '@nba-who-am-i/shared';

/**
 * Get encouraging message based on performance using universe wording
 */
function getEncouragingMessage(
  messages: EncouragingMessagesWording,
  playerName: string,
  percentile?: number,
  allLevelsCleared?: boolean
): string {
  if (allLevelsCleared) {
    return t(messages.allCleared, { playerName });
  }
  if (!percentile) return t(messages.noPercentile, { playerName });
  if (percentile >= 90) return t(messages.top90, { playerName, percentile });
  if (percentile >= 75) return t(messages.top75, { playerName, percentile });
  if (percentile >= 50) return t(messages.top50, { playerName, percentile });
  if (percentile >= 25) return t(messages.top25, { playerName, percentile });
  return t(messages.default, { playerName, percentile });
}

/**
 * Game over screen with achievements, percentile ranking, and sharing
 */
export function GameOverScreen({
  answerName,
  totalScore,
  round,
  maxStreak,
  isTimeout,
  startGame,
  resetToMenu,
  difficulty,
  highestLevelCleared,
  allLevelsCleared,
  playerPercentile,
  totalPlayers: _totalPlayers,
  playerName,
}: GameOverScreenProps) {
  const isMobile = useIsMobile();
  const wording = useWording();
  const [showShareCard, setShowShareCard] = useState(false);

  const encouragingMessage = getEncouragingMessage(
    wording.encouragingMessages,
    playerName,
    playerPercentile,
    allLevelsCleared
  );

  useEffect(() => {
    // Track if component is mounted to prevent stale closure issues
    let mounted = true;
    let listenerAdded = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !showShareCard) {
        startGame();
      }
    };

    // Small delay to prevent Enter key from immediately triggering startGame
    // when transitioning from playing screen (where Enter submits guess)
    const timeoutId = setTimeout(() => {
      if (mounted) {
        window.addEventListener('keydown', handleKeyDown);
        listenerAdded = true;
      }
    }, 100);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (listenerAdded) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [startGame, showShareCard]);

  return (
    <>
      <Card className={cn('text-center', isMobile ? 'p-8' : 'p-12')}>
        {/* Icon */}
        <div className={cn('mb-2', isMobile ? 'text-6xl' : 'text-7xl')}>
          {allLevelsCleared ? '🏆⭐' : isTimeout ? '⏱️' : '🏁'}
        </div>

        {/* Title */}
        <h2
          className={cn(
            'font-black mb-4',
            isMobile ? 'text-xl' : 'text-2xl',
            allLevelsCleared
              ? 'text-universe-secondary'
              : 'text-universe-primary'
          )}
        >
          {allLevelsCleared
            ? wording.gameOver.hallOfFameTitle
            : isTimeout
              ? wording.gameOver.timeoutTitle
              : wording.gameOver.gameOverTitle}
        </h2>

        {/* Achievement Grid - show if any levels cleared */}
        {highestLevelCleared > 0 && (
          <div className="mb-6">
            <AchievementGrid
              highestLevelCleared={highestLevelCleared}
              allLevelsCleared={allLevelsCleared}
              size="md"
            />
          </div>
        )}

        {/* Encouraging Message */}
        <div
          className={cn(
            'mb-6 px-4 py-3 rounded-2xl',
            'bg-dark-700/50 border border-dark-600/50',
            isMobile ? 'text-sm' : 'text-base',
            allLevelsCleared ? 'text-universe-secondary' : 'text-white'
          )}
        >
          {encouragingMessage}
        </div>

        {/* Answer reveal */}
        {answerName && (
          <>
            <p
              className={cn(
                'text-dark-500 mb-1',
                isMobile ? 'text-xs' : 'text-sm'
              )}
            >
              {wording.gameOver.answerPrefix}
            </p>
            <p
              className={cn('font-bold mb-6', isMobile ? 'text-lg' : 'text-xl')}
            >
              {answerName}
            </p>
          </>
        )}

        {/* Final stats */}
        <div
          className={cn(
            'grid gap-4 mb-6 bg-dark-700/50 rounded-2xl',
            isMobile ? 'grid-cols-1 p-4' : 'grid-cols-3 p-5'
          )}
        >
          <div className="text-center">
            <div className="text-xs text-dark-500 mb-1">
              {wording.gameOver.finalScoreLabel}
            </div>
            <div className="text-3xl font-black text-universe-accent">
              {totalScore}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-500 mb-1">
              {wording.gameOver.roundsLabel}
            </div>
            <div className="text-3xl font-black text-white">{round}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-500 mb-1">
              {wording.gameOver.maxStreakLabel}
            </div>
            <div className="text-3xl font-black text-universe-primary">
              {maxStreak} 🎮
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          {/* Share button - prominent if cleared levels */}
          {(highestLevelCleared > 0 || totalScore > 0) && (
            <Button
              onClick={() => setShowShareCard(true)}
              size={allLevelsCleared ? 'lg' : 'md'}
              className="w-full"
              gradient={
                allLevelsCleared
                  ? 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #EF4444 100%)'
                  : undefined
              }
              glow={allLevelsCleared ? 'rgba(252,211,77,0.5)' : undefined}
            >
              {allLevelsCleared
                ? wording.gameOver.shareButtonGoat
                : wording.gameOver.shareButton}
            </Button>
          )}

          {/* Play again button */}
          <Button onClick={startGame} size="lg" className="w-full">
            {wording.gameOver.playAgainButton}
          </Button>

          {/* Menu button */}
          <Button
            onClick={resetToMenu}
            size="md"
            variant="secondary"
            className="w-full"
          >
            {wording.gameOver.menuButton}
          </Button>
        </div>
      </Card>

      {/* Share modal */}
      {showShareCard && (
        <ShareCard
          playerName={playerName}
          totalScore={totalScore}
          maxStreak={maxStreak}
          round={round}
          difficulty={difficulty}
          highestLevelCleared={highestLevelCleared}
          allLevelsCleared={allLevelsCleared}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </>
  );
}
