import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useWording, useUniverse } from '@/contexts/UniverseContext';
import { Logo } from '@/components/ui/Logo';

/**
 * Full-screen loading screen with animated logo
 * Shown during initial load and game transitions
 */
export function LoadingScreen() {
  const isMobile = useIsMobile();
  const wording = useWording();
  const universe = useUniverse();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Animated Logo - universe-aware colors */}
      <div
        className={cn(
          'relative animate-pulse',
          isMobile ? 'w-40 h-40' : 'w-52 h-52'
        )}
        style={{
          filter: `drop-shadow(0 0 30px var(--universe-gradient-glow)) drop-shadow(0 0 60px var(--universe-gradient-glow))`,
        }}
      >
        <Logo className="w-full h-full" />
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h2
          className={cn(
            'font-black tracking-tight mb-3',
            isMobile ? 'text-2xl' : 'text-3xl'
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
        </h2>
        <p className="text-dark-500 text-sm animate-pulse">{wording.loading}</p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-universe-primary"
            style={{
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
