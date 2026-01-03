import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useMemo, useEffect, useRef } from 'react';

export interface HintsDisplayProps {
  displayedText: string;
}

/**
 * QPUC-inspired hints display with slide-in animations
 * Features: Per-hint animations, dimmed previous hints, highlighted current hint
 */
export function HintsDisplay({ displayedText }: HintsDisplayProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse the displayed text into individual hints
  const { completedHints, currentHint, isTyping } = useMemo(() => {
    // Split by double newlines (hint separator)
    const parts = displayedText.split('\n\n');
    const completed: string[] = [];
    let current = '';
    let typing = false;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i < parts.length - 1) {
        // Completed hints (followed by double newline)
        completed.push(part);
      } else {
        // Last part is current (may be incomplete)
        current = part;
        typing = part.length > 0;
      }
    }

    return {
      completedHints: completed,
      currentHint: current,
      isTyping: typing,
    };
  }, [displayedText]);

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  const totalHints = completedHints.length + (currentHint ? 1 : 0);

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
        {/* Completed hints - dimmed with fade effect */}
        {completedHints.map((hint, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-500',
              'animate-in slide-in-from-left-4 fade-in',
              // Older hints are more dimmed
              index < completedHints.length - 1 ? 'opacity-40' : 'opacity-60'
            )}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'backwards',
            }}
          >
            <div className="flex items-start gap-2">
              {/* Hint number badge */}
              <span
                className={cn(
                  'shrink-0 inline-flex items-center justify-center',
                  'rounded-full bg-dark-600/80 text-dark-400',
                  'font-bold tabular-nums',
                  isMobile ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'
                )}
              >
                {index + 1}
              </span>
              <p
                className={cn(
                  'font-mono text-white/70',
                  'leading-relaxed',
                  isMobile ? 'text-sm' : 'text-base'
                )}
              >
                {hint}
              </p>
            </div>
          </div>
        ))}

        {/* Current hint - highlighted with glow */}
        {currentHint && (
          <div
            className={cn(
              'transition-all duration-300',
              'animate-in slide-in-from-left-4 fade-in'
            )}
          >
            <div className="flex items-start gap-2">
              {/* Current hint number badge - highlighted */}
              <span
                className={cn(
                  'shrink-0 inline-flex items-center justify-center',
                  'rounded-full bg-ball-500/30 text-ball-400',
                  'font-bold tabular-nums',
                  'shadow-[0_0_10px_rgba(255,56,100,0.3)]',
                  isMobile ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'
                )}
              >
                {totalHints}
              </span>
              <p
                className={cn(
                  'font-mono text-white',
                  'leading-relaxed',
                  isMobile ? 'text-sm' : 'text-base'
                )}
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.1)',
                }}
              >
                {currentHint}
                {/* Blinking cursor */}
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-ball-400 ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
          </div>
        )}

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
