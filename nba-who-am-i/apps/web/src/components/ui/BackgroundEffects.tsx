/**
 * Decorative background effects with gradient overlays
 * Provides ambient lighting effects for the game interface
 */
export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top-left orange glow */}
      <div
        className="absolute -top-20 -left-10 w-[500px] h-[500px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right blue glow */}
      <div
        className="absolute -bottom-20 -right-10 w-[600px] h-[600px]"
        style={{
          background:
            'radial-gradient(circle, rgba(29,66,138,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Center accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        style={{
          background:
            'radial-gradient(circle, rgba(220,38,38,0.03) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
