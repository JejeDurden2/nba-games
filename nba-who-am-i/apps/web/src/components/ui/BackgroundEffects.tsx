import { cn } from '@/lib/utils';

export interface BackgroundEffectsProps {
  /** Whether the game is currently active */
  isPlaying?: boolean;
  /** Current potential score (for tension levels) */
  potentialScore?: number;
}

/**
 * Universe-aware background effects with tension building
 * Features: Dynamic glow intensity, color shifts based on score, vignette effect
 * Uses CSS variables for universe-specific colors
 */
export function BackgroundEffects({
  isPlaying = false,
  potentialScore = 1000,
}: BackgroundEffectsProps) {
  // Calculate tension level (0 = calm, 1 = maximum tension)
  const tensionLevel = isPlaying ? Math.max(0, 1 - potentialScore / 1000) : 0;

  // Dynamic colors based on tension - uses universe CSS variables
  const getAccentColor = () => {
    if (!isPlaying) return 'var(--universe-bg-tint)';
    if (potentialScore >= 800) return 'rgb(var(--universe-accent-rgb) / 0.08)'; // Accent glow
    if (potentialScore >= 400)
      return 'rgb(var(--universe-secondary-rgb) / 0.1)'; // Secondary glow
    return 'rgb(var(--universe-primary-rgb) / 0.12)'; // Primary glow - urgent
  };

  // Vignette intensity increases with tension
  const vignetteOpacity = isPlaying ? 0.3 + tensionLevel * 0.4 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top-left warm glow - uses secondary color */}
      <div
        className={cn(
          'absolute -top-20 -left-10 w-[500px] h-[500px]',
          'transition-all duration-1000'
        )}
        style={{
          background: isPlaying
            ? `radial-gradient(circle, ${getAccentColor()} 0%, transparent 70%)`
            : 'radial-gradient(circle, rgb(var(--universe-secondary-rgb) / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right cool glow - uses accent color */}
      <div
        className={cn(
          'absolute -bottom-20 -right-10 w-[600px] h-[600px]',
          'transition-all duration-1000'
        )}
        style={{
          background:
            'radial-gradient(circle, rgb(var(--universe-accent-rgb) / 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Center accent glow - responds to game state */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'transition-all duration-500',
          isPlaying ? 'w-[1200px] h-[1200px]' : 'w-[800px] h-[800px]'
        )}
        style={{
          background: `radial-gradient(circle, ${getAccentColor()} 0%, transparent 60%)`,
        }}
      />

      {/* Edge vignette - increases tension during play */}
      {isPlaying && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: vignetteOpacity,
            background: `radial-gradient(ellipse at center, transparent 40%, color-mix(in srgb, var(--universe-bg-main) 80%, black) 100%)`,
          }}
        />
      )}

      {/* Pulsing primary overlay for critical moments */}
      {isPlaying && potentialScore <= 200 && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              'radial-gradient(circle at center, transparent 50%, rgb(var(--universe-primary-rgb) / 0.08) 100%)',
          }}
        />
      )}
    </div>
  );
}
