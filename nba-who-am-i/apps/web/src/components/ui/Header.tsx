import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useUniverse } from '@/contexts/UniverseContext';
import { Logo } from './Logo';

export interface HeaderProps {
  onClick?: () => void;
  clickable?: boolean;
  compact?: boolean;
}

/**
 * App header with logo and title
 * Clickable to return to menu when in game
 */
export function Header({
  onClick,
  clickable = false,
  compact = false,
}: HeaderProps) {
  const isMobile = useIsMobile();
  const universe = useUniverse();

  return (
    <header className={cn('text-center', compact ? 'mb-4' : 'mb-8')}>
      <div
        onClick={clickable ? onClick : undefined}
        className={cn(
          'inline-flex flex-col items-center',
          compact ? 'gap-2' : 'gap-3',
          clickable &&
            'cursor-pointer group transition-all duration-300 hover:scale-[1.02]'
        )}
      >
        {/* Logo - universe-aware colors */}
        <div
          className={cn(
            'relative transition-transform duration-300',
            clickable && 'group-hover:scale-105',
            compact
              ? isMobile
                ? 'w-16 h-16'
                : 'w-20 h-20'
              : isMobile
                ? 'w-28 h-28'
                : 'w-36 h-36'
          )}
          style={{
            filter: `drop-shadow(0 0 25px var(--universe-gradient-glow)) drop-shadow(0 0 50px var(--universe-gradient-glow))`,
          }}
        >
          <Logo
            className={cn(
              'w-full h-full transition-all duration-300',
              clickable && 'group-hover:brightness-110'
            )}
          />
        </div>

        {/* Title */}
        <h1
          className={cn(
            'font-black tracking-tight leading-tight',
            compact
              ? isMobile
                ? 'text-xl'
                : 'text-2xl'
              : isMobile
                ? 'text-3xl'
                : 'text-4xl'
          )}
        >
          <span
            className="bg-clip-text"
            style={{
              backgroundImage: 'var(--universe-gradient-primary)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {universe.name}
          </span>
          <span className="text-white"> WHO AM I</span>
          <span className="text-universe-primary"> ?</span>
        </h1>
      </div>
    </header>
  );
}
