import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface HintsDisplayProps {
  displayedText: string;
}

/**
 * Displays hints with typewriter animation and blinking cursor
 */
export function HintsDisplay({ displayedText }: HintsDisplayProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'bg-dark-800/60 rounded-2xl',
        'border border-dark-600/50',
        'overflow-y-auto',
        isMobile ? 'p-4 h-48' : 'p-6 h-64'
      )}
    >
      <pre
        className={cn(
          'font-mono whitespace-pre-wrap text-white/90',
          'leading-relaxed',
          isMobile ? 'text-sm' : 'text-base'
        )}
      >
        {displayedText}
        <span className="inline-block w-2 h-5 bg-ball-400 ml-1 animate-blink" />
      </pre>
    </div>
  );
}
