import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface HeaderProps {
  onClick?: () => void;
  clickable?: boolean;
}

/**
 * App header with logo and title
 * Clickable to return to menu when in game
 */
export function Header({ onClick, clickable = false }: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="text-center mb-8">
      <div
        onClick={clickable ? onClick : undefined}
        className={cn(
          'inline-flex flex-col items-center gap-3',
          clickable && 'cursor-pointer hover:opacity-80 transition-opacity'
        )}
      >
        {/* Logo */}
        <div className={cn('relative', isMobile ? 'w-24 h-24' : 'w-32 h-32')}>
          <img
            src="/logo.svg"
            alt="NBA Who Am I Logo"
            className="w-full h-full drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))',
            }}
          />
        </div>

        {/* Title */}
        <h1
          className={cn(
            'font-black tracking-tight leading-tight',
            isMobile ? 'text-3xl' : 'text-4xl'
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
