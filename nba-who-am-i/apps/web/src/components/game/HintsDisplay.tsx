import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface HintsDisplayProps {
  displayedText: string;
}

/**
 * Displays hints with typewriter animation and blinking cursor
 * Uses fixed height to prevent layout shifts during text reveal
 */
export function HintsDisplay({ displayedText }: HintsDisplayProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'bg-dark-800/60 rounded-2xl',
        'border border-dark-600/50',
        'overflow-y-auto overflow-x-hidden',
        'w-full'
      )}
      style={{
        height: isMobile ? '192px' : '256px',
        minHeight: isMobile ? '192px' : '256px',
        maxHeight: isMobile ? '192px' : '256px',
      }}
    >
      <div className={cn(isMobile ? 'p-4' : 'p-6')}>
        <pre
          className={cn(
            'font-mono whitespace-pre-wrap text-white/90',
            'leading-relaxed',
            'break-words overflow-wrap-anywhere',
            isMobile ? 'text-sm' : 'text-base',
            'w-full'
          )}
          style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
        >
          {displayedText}
          <span className="inline-block w-2 h-5 bg-ball-400 ml-1 animate-blink" />
        </pre>
      </div>
    </div>
  );
}
