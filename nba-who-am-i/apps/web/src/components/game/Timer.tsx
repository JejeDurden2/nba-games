import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface TimerProps {
  timeLeft: number;
  totalTime?: number;
  calculatePotentialScore: (time: number) => number;
}

/**
 * Countdown timer with color-coded progress bar
 */
export function Timer({
  timeLeft,
  totalTime = 30,
  calculatePotentialScore,
}: TimerProps) {
  const isMobile = useIsMobile();

  // Dynamic color based on time remaining
  const timerColor =
    timeLeft > 20
      ? 'text-accent-green'
      : timeLeft > 10
        ? 'text-accent-yellow'
        : 'text-rim-500';

  const progressBarColor =
    timeLeft > 20
      ? 'bg-accent-green'
      : timeLeft > 10
        ? 'bg-accent-yellow'
        : 'bg-rim-500';

  const progressPercent = (timeLeft / totalTime) * 100;
  const potentialScore = calculatePotentialScore(timeLeft);

  return (
    <div>
      {/* Timer display */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={cn(
            'font-black tabular-nums',
            timerColor,
            isMobile ? 'text-3xl' : 'text-4xl',
            timeLeft <= 5 && 'animate-pulse'
          )}
        >
          {timeLeft}s
        </span>
        <span
          className={cn(
            'font-semibold',
            'text-dark-500',
            isMobile ? 'text-xs' : 'text-sm'
          )}
        >
          Score potentiel:{' '}
          <span className="text-accent-cyan">{potentialScore}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-1000',
            progressBarColor
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
