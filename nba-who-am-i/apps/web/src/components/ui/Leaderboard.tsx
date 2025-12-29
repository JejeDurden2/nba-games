import { LeaderboardEntry } from '../../api/game';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  limit?: number;
}

/**
 * Displays leaderboard entries with rank medals
 */
export function Leaderboard({ entries, limit = 5 }: LeaderboardProps) {
  const isMobile = useIsMobile();
  const displayedEntries = entries.slice(0, limit);

  const getRankEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  return (
    <div className="space-y-2">
      {displayedEntries.map((entry, index) => (
        <div
          key={entry.id}
          className={cn(
            'flex items-center justify-between',
            'bg-dark-700/50 rounded-xl',
            isMobile ? 'px-3 py-2.5' : 'px-4 py-3'
          )}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span
              className={cn(
                'font-bold',
                isMobile ? 'text-base' : 'text-lg',
                index < 3 ? 'text-2xl' : 'text-dark-500'
              )}
            >
              {getRankEmoji(index + 1)}
            </span>
            <span
              className={cn(
                'font-semibold truncate',
                isMobile ? 'text-sm' : 'text-base',
                index < 3 ? 'text-white' : 'text-dark-500'
              )}
            >
              {entry.playerName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'font-bold text-accent-cyan',
                isMobile ? 'text-sm' : 'text-base'
              )}
            >
              {entry.score.toLocaleString()}
            </span>
            {entry.maxStreak > 0 && (
              <span className={cn('text-xs', 'text-ball-400')}>
                {entry.maxStreak}🔥
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
