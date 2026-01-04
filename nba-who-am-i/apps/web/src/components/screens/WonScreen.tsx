import { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useWording } from '@/contexts/UniverseContext';

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
  const wording = useWording();

  useEffect(() => {
    // Track if component is mounted to prevent stale closure issues
    let mounted = true;
    let listenerAdded = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
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
  }, [startGame]);

  return (
    <Card className={cn('text-center', isMobile ? 'p-8' : 'p-12')}>
      {/* Success icon */}
      <div className={cn('mb-4', isMobile ? 'text-6xl' : 'text-7xl')}>🎉</div>

      {/* Title */}
      <h2
        className={cn(
          'font-black text-universe-secondary mb-2',
          isMobile ? 'text-2xl' : 'text-3xl'
        )}
      >
        {wording.won.title}
      </h2>

      {/* Answer */}
      <p
        className={cn('text-dark-500 mb-1', isMobile ? 'text-sm' : 'text-base')}
      >
        {wording.won.answerPrefix}
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
            <div className="text-dark-500 text-sm mb-1">
              {wording.won.scoreLabel}
            </div>
            <div
              className={cn(
                'font-black text-universe-accent',
                isMobile ? 'text-2xl' : 'text-3xl'
              )}
            >
              +{score}
            </div>
          </div>
          <div>
            <div className="text-dark-500 text-sm mb-1">
              {wording.won.streakLabel}
            </div>
            <div
              className={cn(
                'font-black text-universe-primary',
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
          {wording.won.nextRoundButton}
        </Button>
        <Button
          onClick={resetToMenu}
          size="md"
          variant="secondary"
          className="w-full"
        >
          {wording.won.menuButton}
        </Button>
      </div>
    </Card>
  );
}
