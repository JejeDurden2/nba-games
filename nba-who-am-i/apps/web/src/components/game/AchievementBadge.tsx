import { achievementLevelConfig } from '../../lib/design-system/tokens';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface AchievementBadgeProps {
  level: 1 | 2 | 3 | 4 | 5;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Individual achievement badge for difficulty levels
 * Shows unlocked state with gradient or locked state in grayscale
 */
export function AchievementBadge({
  level,
  unlocked,
  size = 'md',
}: AchievementBadgeProps) {
  const isMobile = useIsMobile();
  const config = achievementLevelConfig[level];

  const sizeClasses = {
    sm: isMobile ? 'w-12 h-12' : 'w-14 h-14',
    md: isMobile ? 'w-16 h-16' : 'w-20 h-20',
    lg: isMobile ? 'w-20 h-20' : 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: isMobile ? 'text-sm' : 'text-base',
    lg: isMobile ? 'text-base' : 'text-xl',
  };

  const numberSizeClasses = {
    sm: 'text-lg',
    md: isMobile ? 'text-2xl' : 'text-3xl',
    lg: isMobile ? 'text-3xl' : 'text-4xl',
  };

  const gradient = unlocked ? config.gradient : config.locked;
  const glow = unlocked ? config.glow : undefined;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Badge Circle */}
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center',
          'border-4 border-dark-700/50',
          'transition-all duration-300',
          sizeClasses[size],
          unlocked && level === 5 && 'animate-pulse'
        )}
        style={{
          background: gradient,
          boxShadow: glow ? `0 0 20px ${glow}` : undefined,
        }}
      >
        {/* Content: Level number or lock icon */}
        {unlocked ? (
          <div className="flex flex-col items-center">
            <span
              className={cn('font-black text-white', numberSizeClasses[size])}
            >
              {level}
            </span>
          </div>
        ) : (
          <span className={cn('text-dark-500', numberSizeClasses[size])}>
            🔒
          </span>
        )}
      </div>

      {/* Label */}
      <div
        className={cn(
          'font-bold text-center',
          textSizeClasses[size],
          unlocked ? 'text-white' : 'text-dark-500'
        )}
      >
        {config.label}
      </div>
    </div>
  );
}
