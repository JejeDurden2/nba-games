import { CharacterType } from '@/api/game';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useCharacterTypes } from '@/contexts/UniverseContext';

export interface CharacterBadgeProps {
  type: CharacterType;
}

/**
 * Displays character type badge with gradient and emoji
 */
export function CharacterBadge({ type }: CharacterBadgeProps) {
  const isMobile = useIsMobile();
  const characterTypes = useCharacterTypes();
  const config = characterTypes[type] || characterTypes['player'];

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
