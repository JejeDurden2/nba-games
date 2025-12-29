import { AchievementBadge } from './AchievementBadge';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface AchievementGridProps {
  highestLevelCleared: number;
  allLevelsCleared: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Grid displaying all 5 achievement badges
 * Shows unlocked/locked state for each level
 */
export function AchievementGrid({
  highestLevelCleared,
  allLevelsCleared,
  size = 'md',
}: AchievementGridProps) {
  const isMobile = useIsMobile();
  const levels: Array<1 | 2 | 3 | 4 | 5> = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col items-center">
      {/* Grid of badges */}
      <div
        className={cn(
          'grid gap-4',
          isMobile ? 'grid-cols-3' : 'grid-cols-5',
          allLevelsCleared && 'animate-pulse'
        )}
      >
        {levels.map((level) => (
          <AchievementBadge
            key={level}
            level={level}
            unlocked={level <= highestLevelCleared}
            size={size}
          />
        ))}
      </div>

      {/* Victory message if all cleared */}
      {allLevelsCleared && (
        <div
          className={cn(
            'mt-6 font-black text-center',
            'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
            'bg-clip-text',
            isMobile ? 'text-lg' : 'text-2xl'
          )}
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          ⭐ TOUS LES NIVEAUX CONQUIS ⭐
        </div>
      )}
    </div>
  );
}
