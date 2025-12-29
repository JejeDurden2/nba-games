import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
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
}

/**
 * Game over screen showing final stats
 */
export function GameOverScreen({
  answerName,
  totalScore,
  round,
  maxStreak,
  isTimeout,
  startGame,
  resetToMenu,
}: GameOverScreenProps) {
  const isMobile = useIsMobile();

  return (
    <Card className={cn('text-center', isMobile ? 'p-8' : 'p-12')}>
      {/* Icon */}
      <div className={cn('mb-2', isMobile ? 'text-6xl' : 'text-7xl')}>
        {isTimeout ? '⏱️' : '🏁'}
      </div>

      {/* Title */}
      <h2
        className={cn(
          'font-black text-rim-500 mb-2',
          isMobile ? 'text-xl' : 'text-2xl'
        )}
      >
        {isTimeout ? 'TEMPS ÉCOULÉ' : 'PARTIE TERMINÉE'}
      </h2>

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
          <p className={cn('font-bold mb-6', isMobile ? 'text-lg' : 'text-xl')}>
            {answerName}
          </p>
        </>
      )}

      {/* Final stats */}
      <div
        className={cn(
          'grid gap-4 mb-8 bg-dark-700/50 rounded-2xl',
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
          <div className="text-3xl font-black text-ball-400">{maxStreak}🔥</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <Button onClick={startGame} size="lg" className="w-full">
          Rejouer
        </Button>
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
  );
}
