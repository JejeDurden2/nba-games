import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

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
        {/* Logo */}
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
        >
          <img
            src="/logo.svg"
            alt="NBA Who Am I Logo"
            className={cn(
              'w-full h-full transition-all duration-300',
              clickable && 'group-hover:brightness-110'
            )}
            style={{
              filter:
                'drop-shadow(0 0 25px rgba(255, 56, 100, 0.4)) drop-shadow(0 0 50px rgba(255, 0, 84, 0.2))',
            }}
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
            className="bg-gradient-fire bg-clip-text"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            NBA
          </span>
          <span className="text-white"> WHO AM I</span>
          <span className="text-ball-400"> ?</span>
        </h1>
      </div>
    </header>
  );
}
