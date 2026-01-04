import { LeaderboardEntry } from '@/api/game';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
  limit?: number;
  isLoading?: boolean;
}

/**
 * Skeleton loader for leaderboard entries
 */
function LeaderboardSkeleton({
  count,
  isMobile,
}: {
  count: number;
  isMobile: boolean;
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => {
        const isTopThree = index < 3;
        return (
          <div
            key={index}
            className={cn(
              'flex items-center justify-between',
              'rounded-xl animate-pulse',
              isMobile ? 'px-3 py-2.5' : 'px-4 py-3',
              isTopThree
                ? 'bg-dark-700/70 border border-dark-600/50'
                : 'bg-dark-700/30'
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={cn(
                  'shrink-0 bg-dark-600 rounded',
                  isMobile ? 'w-8 h-6' : 'w-10 h-7'
                )}
              />
              <div
                className={cn(
                  'bg-dark-600 rounded h-4',
                  isMobile ? 'w-24' : 'w-32'
                )}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={cn(
                  'bg-dark-600 rounded h-4',
                  isMobile ? 'w-12' : 'w-16'
                )}
              />
              <div className="bg-dark-600 rounded h-4 w-8" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Displays leaderboard entries with rank medals
 */
export function Leaderboard({
  entries,
  limit = 5,
  isLoading = false,
}: LeaderboardProps) {
  const isMobile = useIsMobile();
  const displayedEntries = entries.slice(0, limit);

  if (isLoading) {
    return <LeaderboardSkeleton count={limit} isMobile={isMobile} />;
  }

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
                  isTopThree ? 'text-universe-accent' : 'text-dark-400'
                )}
              >
                {entry.score.toLocaleString()}
              </span>
              {entry.maxStreak > 0 && (
                <span
                  className={cn(
                    'text-xs',
                    isTopThree ? 'text-universe-primary' : 'text-dark-500'
                  )}
                >
                  {entry.maxStreak} 🎮
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
