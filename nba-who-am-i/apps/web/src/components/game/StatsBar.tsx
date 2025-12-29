import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface StatsBarProps {
  round: number;
  streak: number;
  totalScore: number;
  difficulty: number;
  questionsAtDifficulty: number;
  failuresThisRound: number;
  onQuit: () => void;
}

/**
 * Displays game statistics bar with round, streak, score, level, and attempts
 */
export function StatsBar({
  round,
  streak,
  totalScore,
  difficulty,
  questionsAtDifficulty,
  failuresThisRound,
  onQuit,
}: StatsBarProps) {
  const isMobile = useIsMobile();

  const attemptsLeft = 3 - failuresThisRound;
  const attemptsColor =
    failuresThisRound === 0
      ? 'text-accent-green'
      : failuresThisRound === 1
        ? 'text-accent-yellow'
        : 'text-rim-500';

  return (
    <div
      className={cn(
        'flex justify-between items-center',
        'bg-dark-800/60 rounded-xl',
        'mb-4',
        isMobile ? 'px-3 py-2.5 text-xs' : 'px-4 py-3 text-sm',
        isMobile ? 'flex-wrap gap-3' : 'flex-nowrap'
      )}
    >
      {/* Stats */}
      <div className={cn('flex gap-3 flex-wrap', isMobile ? 'gap-3' : 'gap-5')}>
        <span className="text-dark-500">
          Round <b className="text-white">{round}</b>
        </span>
        <span className="text-dark-500">
          Streak <b className="text-ball-400">{streak}🔥</b>
        </span>
        <span className="text-dark-500">
          Score <b className="text-accent-cyan">{totalScore}</b>
        </span>
        <span className="text-dark-500">
          Niveau <b className="text-accent-yellow">{difficulty}</b>{' '}
          <span className="text-xs text-dark-500">
            ({questionsAtDifficulty}/5)
          </span>
        </span>
        <span className="text-dark-500">
          Essais <b className={attemptsColor}>{attemptsLeft}/3</b>
        </span>
      </div>

      {/* Quit button */}
      <button
        onClick={onQuit}
        className={cn(
          'bg-rim-500/20 border border-rim-500/40',
          'rounded-md text-red-300',
          'font-semibold whitespace-nowrap',
          'hover:bg-rim-500/30 transition-colors',
          isMobile ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs'
        )}
      >
        ✕ Quitter
      </button>
    </div>
  );
}
