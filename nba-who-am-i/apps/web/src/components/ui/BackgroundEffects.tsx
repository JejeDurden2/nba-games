import { cn } from '@/lib/utils';

export interface BackgroundEffectsProps {
  /** Whether the game is currently active */
  isPlaying?: boolean;
  /** Current potential score (for tension levels) */
  potentialScore?: number;
}

/**
 * QPUC-inspired background effects with tension building
 * Features: Dynamic glow intensity, color shifts based on score, vignette effect
 */
export function BackgroundEffects({
  isPlaying = false,
  potentialScore = 1000,
}: BackgroundEffectsProps) {
  // Calculate tension level (0 = calm, 1 = maximum tension)
  const tensionLevel = isPlaying ? Math.max(0, 1 - potentialScore / 1000) : 0;

  // Dynamic colors based on tension
  const getAccentColor = () => {
    if (!isPlaying) return 'rgba(220,38,38,0.03)';
    if (potentialScore >= 800) return 'rgba(0,255,136,0.06)'; // Green glow
    if (potentialScore >= 400) return 'rgba(255,214,0,0.08)'; // Yellow/orange glow
    return 'rgba(255,0,84,0.12)'; // Red glow - urgent
  };

  // Vignette intensity increases with tension
  const vignetteOpacity = isPlaying ? 0.3 + tensionLevel * 0.4 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top-left orange glow */}
      <div
        className={cn(
          'absolute -top-20 -left-10 w-[500px] h-[500px]',
          'transition-all duration-1000'
        )}
        style={{
          background: isPlaying
            ? `radial-gradient(circle, ${getAccentColor()} 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right blue glow */}
      <div
        className={cn(
          'absolute -bottom-20 -right-10 w-[600px] h-[600px]',
          'transition-all duration-1000'
        )}
        style={{
          background:
            'radial-gradient(circle, rgba(29,66,138,0.06) 0%, transparent 70%)',
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

      {/* QPUC-style edge vignette - increases tension */}
      {isPlaying && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: vignetteOpacity,
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.8) 100%)',
          }}
        />
      )}

      {/* Pulsing red overlay for critical moments */}
      {isPlaying && potentialScore <= 200 && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              'radial-gradient(circle at center, transparent 50%, rgba(255,0,84,0.08) 100%)',
          }}
        />
      )}
    </div>
  );
}
