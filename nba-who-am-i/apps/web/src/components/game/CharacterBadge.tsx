import { CharacterType } from '../../api/game';
import { characterTypeConfig } from '../../lib/design-system/tokens';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface CharacterBadgeProps {
  type: CharacterType;
}

/**
 * Displays character type badge with gradient and emoji
 */
export function CharacterBadge({ type }: CharacterBadgeProps) {
  const isMobile = useIsMobile();
  const config = characterTypeConfig[type];

  return (
    <div
      className={cn(
        'rounded-full font-black tracking-widest',
        'flex items-center gap-2',
        'shadow-lg',
        isMobile ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'
      )}
      style={{
        background: config.gradient,
        boxShadow: `0 0 20px ${config.glow}`,
      }}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </div>
  );
}
