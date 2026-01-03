import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * Full-screen loading screen with animated logo
 * Shown during initial load and game transitions
 */
export function LoadingScreen() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Animated Logo */}
      <div
        className={cn(
          'relative animate-pulse',
          isMobile ? 'w-40 h-40' : 'w-52 h-52'
        )}
      >
        <img
          src="/logo.svg"
          alt="NBA Who Am I"
          className="w-full h-full"
          style={{
            filter:
              'drop-shadow(0 0 30px rgba(255, 56, 100, 0.5)) drop-shadow(0 0 60px rgba(255, 0, 84, 0.3))',
          }}
        />
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
            className="bg-gradient-fire bg-clip-text"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            NBA
          </span>
          <span className="text-white"> WHO AM I</span>
          <span className="text-ball-400"> ?</span>
        </h2>
        <p className="text-dark-500 text-sm animate-pulse">Chargement...</p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-ball-400"
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
