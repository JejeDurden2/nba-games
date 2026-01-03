import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useMemo, useEffect, useRef } from 'react';

export interface HintsDisplayProps {
  displayedText: string;
}

interface ParsedHint {
  text: string;
  isComplete: boolean;
  isCurrent: boolean;
}

/**
 * QPUC-inspired hints display with slide-in animations
 * Features: Per-hint animations, dimmed previous hints, highlighted current hint
 */
export function HintsDisplay({ displayedText }: HintsDisplayProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse the displayed text into individual hints with their states
  const hints = useMemo((): ParsedHint[] => {
    if (!displayedText) return [];

    // Split by double newlines (hint separator)
    const parts = displayedText.split('\n\n');
    return parts.map((text, index) => ({
      text,
      isComplete: index < parts.length - 1, // All but last are complete
      isCurrent: index === parts.length - 1 && text.length > 0,
    }));
  }, [displayedText]);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Calculate opacity for each hint based on its position
  const getHintOpacity = (index: number, isComplete: boolean): number => {
    if (!isComplete) return 1; // Current hint is fully visible
    const distanceFromCurrent = hints.length - 1 - index;
    if (distanceFromCurrent === 0) return 0.7; // Just completed
    if (distanceFromCurrent === 1) return 0.5; // One before
    return 0.4; // Older hints
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'bg-dark-800/60 rounded-2xl',
        'border border-dark-600/50',
        'overflow-y-auto overflow-x-hidden',
        'w-full scroll-smooth'
      )}
      style={{
        height: isMobile ? '192px' : '256px',
        minHeight: isMobile ? '192px' : '256px',
        maxHeight: isMobile ? '192px' : '256px',
      }}
    >
      <div className={cn(isMobile ? 'p-4' : 'p-6', 'space-y-3')}>
        {/* Render all hints with stable keys */}
        {hints.map((hint, index) => (
          <div
            key={`hint-${index}`}
            className="transition-opacity duration-700 ease-out"
            style={{
              opacity: getHintOpacity(index, hint.isComplete),
            }}
          >
            <div className="flex items-start gap-2">
              {/* Hint number badge */}
              <span
                className={cn(
                  'shrink-0 inline-flex items-center justify-center',
                  'rounded-full font-bold tabular-nums',
                  'transition-all duration-500',
                  isMobile ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs',
                  hint.isCurrent
                    ? 'bg-ball-500/30 text-ball-400 shadow-[0_0_10px_rgba(255,56,100,0.3)]'
                    : 'bg-dark-600/80 text-dark-400'
                )}
              >
                {index + 1}
              </span>
              <p
                className={cn(
                  'font-mono leading-relaxed transition-all duration-500',
                  isMobile ? 'text-sm' : 'text-base',
                  hint.isCurrent ? 'text-white' : 'text-white/70'
                )}
                style={
                  hint.isCurrent
                    ? { textShadow: '0 0 20px rgba(255,255,255,0.1)' }
                    : undefined
                }
              >
                {hint.text}
                {/* Blinking cursor only on current hint */}
                {hint.isCurrent && (
                  <span className="inline-block w-2 h-5 bg-ball-400 ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
          </div>
        ))}

        {/* Empty state cursor */}
        {!displayedText && (
          <div className="flex items-start gap-2">
            <span
              className={cn(
                'shrink-0 inline-flex items-center justify-center',
                'rounded-full bg-ball-500/30 text-ball-400',
                'font-bold tabular-nums',
                isMobile ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'
              )}
            >
              1
            </span>
            <span className="inline-block w-2 h-5 bg-ball-400 animate-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
