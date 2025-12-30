import { useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface WonScreenProps {
  answerName: string;
  score: number;
  streak: number;
  startGame: () => void;
  resetToMenu: () => void;
}

/**
 * Victory screen showing correct answer and score earned
 */
export function WonScreen({
  answerName,
  score,
  streak,
  startGame,
  resetToMenu,
}: WonScreenProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startGame]);

  return (
    <Card className={cn('text-center', isMobile ? 'p-8' : 'p-12')}>
      {/* Success icon */}
      <div className={cn('mb-4', isMobile ? 'text-6xl' : 'text-7xl')}>🎉</div>

      {/* Title */}
      <h2
        className={cn(
          'font-black text-accent-green mb-2',
          isMobile ? 'text-2xl' : 'text-3xl'
        )}
      >
        BANG ! BUCKETS ! 💰
      </h2>

      {/* Answer */}
      <p
        className={cn('text-dark-500 mb-1', isMobile ? 'text-sm' : 'text-base')}
      >
        Yessir, c&apos;était
      </p>
      <p
        className={cn(
          'font-bold text-white mb-6',
          isMobile ? 'text-xl' : 'text-2xl'
        )}
      >
        {answerName}
      </p>

      {/* Score breakdown */}
      <div
        className={cn(
          'bg-dark-700/50 rounded-2xl mb-8',
          isMobile ? 'p-6' : 'p-8'
        )}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-dark-500 text-sm mb-1">SCORE</div>
            <div
              className={cn(
                'font-black text-accent-cyan',
                isMobile ? 'text-2xl' : 'text-3xl'
              )}
            >
              +{score}
            </div>
          </div>
          <div>
            <div className="text-dark-500 text-sm mb-1">GAMEBREAKER</div>
            <div
              className={cn(
                'font-black text-ball-400',
                isMobile ? 'text-2xl' : 'text-3xl'
              )}
            >
              {streak}🎮
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <Button onClick={startGame} size="lg" className="w-full">
          Prochain round →
        </Button>
        <Button
          onClick={resetToMenu}
          size="md"
          variant="secondary"
          className="w-full"
        >
          🏠 Retour au menu
        </Button>
      </div>
    </Card>
  );
}
