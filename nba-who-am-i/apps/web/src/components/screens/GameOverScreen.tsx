import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AchievementGrid } from '../game/AchievementGrid';
import { ShareCard } from '../game/ShareCard';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

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

/**
 * Get encouraging message based on performance
 */
function getEncouragingMessage(
  percentile?: number,
  allLevelsCleared?: boolean
): string {
  if (allLevelsCleared) {
    return '🎉 INCROYABLE ! Tu as conquis tous les niveaux ! Tu es un vrai champion NBA ! 🏆';
  }
  if (!percentile) return 'Bien joué ! Continue de t&apos;entraîner ! 💪';
  if (percentile >= 90)
    return `🔥 Exceptionnel ! Tu es meilleur que ${percentile}% des joueurs !`;
  if (percentile >= 75)
    return `⭐ Impressionnant ! Tu es meilleur que ${percentile}% des joueurs !`;
  if (percentile >= 50)
    return `👍 Bien joué ! Tu es meilleur que ${percentile}% des joueurs !`;
  if (percentile >= 25)
    return `💪 Continue ! Tu es meilleur que ${percentile}% des joueurs !`;
  return `🏀 Bon début ! Tu es meilleur que ${percentile}% des joueurs ! Continue ! 📈`;
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
  const [showShareCard, setShowShareCard] = useState(false);

  const encouragingMessage = getEncouragingMessage(
    playerPercentile,
    allLevelsCleared
  );

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
            allLevelsCleared ? 'text-accent-yellow' : 'text-rim-500'
          )}
        >
          {allLevelsCleared
            ? 'CHAMPION NBA!'
            : isTimeout
              ? 'TEMPS ÉCOULÉ'
              : 'PARTIE TERMINÉE'}
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
            allLevelsCleared ? 'text-accent-yellow' : 'text-white'
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
              La réponse était:
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
            <div className="text-xs text-dark-500 mb-1">SCORE FINAL</div>
            <div className="text-3xl font-black text-accent-cyan">
              {totalScore}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-500 mb-1">ROUNDS</div>
            <div className="text-3xl font-black text-white">{round}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-dark-500 mb-1">MAX STREAK</div>
            <div className="text-3xl font-black text-ball-400">
              {maxStreak}🔥
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
              {allLevelsCleared ? '🏆 Partager ma victoire!' : '📤 Partager'}
            </Button>
          )}

          {/* Play again button */}
          <Button onClick={startGame} size="lg" className="w-full">
            Rejouer
          </Button>

          {/* Menu button */}
          <Button
            onClick={resetToMenu}
            size="md"
            variant="secondary"
            className="w-full"
          >
            🏠 Menu principal
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
