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
      {displayedEntries.map((entry, index) => {
        const rank = index + 1;
        const isTopThree = rank <= 3;

        return (
          <div
            key={entry.id}
            className={cn(
              'flex items-center justify-between',
              'rounded-xl transition-all',
              isMobile ? 'px-3 py-2.5' : 'px-4 py-3',
              isTopThree
                ? 'bg-dark-700/70 border border-dark-600/50'
                : 'bg-dark-700/30'
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className={cn(
                  'font-bold shrink-0',
                  isMobile ? 'w-8' : 'w-10',
                  isTopThree
                    ? 'text-2xl'
                    : cn('text-dark-400', isMobile ? 'text-sm' : 'text-base')
                )}
              >
                {getRankEmoji(rank)}
              </span>
              <span
                className={cn(
                  'font-semibold truncate',
                  isMobile ? 'text-sm' : 'text-base',
                  isTopThree ? 'text-white' : 'text-dark-400'
                )}
              >
                {entry.playerName}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  'font-bold',
                  isMobile ? 'text-sm' : 'text-base',
                  isTopThree ? 'text-accent-cyan' : 'text-dark-400'
                )}
              >
                {entry.score.toLocaleString()}
              </span>
              {entry.maxStreak > 0 && (
                <span
                  className={cn(
                    'text-xs',
                    isTopThree ? 'text-ball-400' : 'text-dark-500'
                  )}
                >
                  {entry.maxStreak}🎮
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
