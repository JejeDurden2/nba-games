import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

export interface TimerProps {
  timeLeft: number;
  totalTime?: number;
  calculatePotentialScore: (time: number) => number;
}

/**
 * QPUC-inspired score countdown with tension building
 * Features: Large score display, color transitions, pulse animation
 */
export function Timer({
  timeLeft,
  totalTime = 40,
  calculatePotentialScore,
}: TimerProps) {
  const isMobile = useIsMobile();
  const potentialScore = calculatePotentialScore(timeLeft);

  // Score-based color zones (QPUC style: green → orange → red)
  const getScoreColor = () => {
    if (potentialScore >= 800) return 'text-accent-green';
    if (potentialScore >= 400) return 'text-universe-secondary';
    return 'text-universe-primary';
  };

  const getProgressColor = () => {
    if (potentialScore >= 800) return 'bg-accent-green';
    if (potentialScore >= 400) return 'bg-universe-secondary';
    return 'bg-universe-primary';
  };

  const getGlowColor = () => {
    if (potentialScore >= 800) return 'rgba(0,255,136,0.4)';
    if (potentialScore >= 400) return 'rgba(255,214,0,0.4)';
    return 'rgba(255,0,84,0.5)';
  };

  const progressPercent = (timeLeft / totalTime) * 100;
  const isUrgent = potentialScore <= 200;
  const isCritical = potentialScore <= 100;

  return (
    <div className="flex flex-col items-end">
      {/* QPUC-style prominent score display */}
      <div
        className={cn(
          'relative flex flex-col items-center justify-center',
          'rounded-2xl transition-all duration-300',
          isMobile ? 'px-4 py-2' : 'px-6 py-3'
        )}
        style={{
          background: 'rgba(19,19,29,0.9)',
          boxShadow: `0 0 ${isUrgent ? '30px' : '20px'} ${getGlowColor()}, inset 0 0 20px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Score label */}
        <span
          className={cn(
            'uppercase tracking-widest font-bold text-dark-500',
            isMobile ? 'text-[10px]' : 'text-xs'
          )}
        >
          Score
        </span>

        {/* Large score number - QPUC centerpiece */}
        <span
          className={cn(
            'font-black tabular-nums leading-none transition-all duration-300',
            getScoreColor(),
            isMobile ? 'text-4xl' : 'text-5xl',
            isUrgent && 'animate-pulse',
            isCritical && 'scale-110'
          )}
          style={{
            textShadow: `0 0 20px ${getGlowColor()}`,
          }}
        >
          {potentialScore}
        </span>

        {/* Time remaining (secondary) */}
        <span
          className={cn(
            'font-medium text-dark-400 tabular-nums',
            isMobile ? 'text-xs' : 'text-sm'
          )}
        >
          {timeLeft}s
        </span>
      </div>

      {/* Progress bar */}
      <div
        className={cn(
          'w-full bg-dark-700 rounded-full overflow-hidden mt-2',
          isMobile ? 'h-1.5' : 'h-2'
        )}
      >
        <div
          className={cn(
            'h-full transition-all duration-1000 ease-linear',
            getProgressColor()
          )}
          style={{
            width: `${progressPercent}%`,
            boxShadow: `0 0 10px ${getGlowColor()}`,
          }}
        />
      </div>
    </div>
  );
}
