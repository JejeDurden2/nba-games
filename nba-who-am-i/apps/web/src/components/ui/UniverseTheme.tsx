import { useEffect } from 'react';
import { useUniverse } from '@/contexts/UniverseContext';

/**
 * Default colors for NBA universe (fallback)
 */
const DEFAULT_COLORS = {
  primary: '#FF1744', // NBA: ball-500 neon red
  secondary: '#FFD600', // NBA: accent-yellow
  accent: '#00E5FF', // NBA: accent-cyan
};

/**
 * Convert hex color to RGB values string (e.g., "#FF1744" -> "255 23 68")
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '255 255 255';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

/**
 * Component that sets CSS variables for universe-specific colors
 * Must be rendered inside UniverseProvider
 */
export function UniverseTheme({ children }: { children: React.ReactNode }) {
  const universe = useUniverse();

  useEffect(() => {
    const root = document.documentElement;

    // Get colors from universe config, falling back to defaults
    const primary = universe.colors?.primary ?? DEFAULT_COLORS.primary;
    const secondary = universe.colors?.secondary ?? DEFAULT_COLORS.secondary;
    const accent = universe.colors?.accent ?? DEFAULT_COLORS.accent;

    // Set CSS variables as RGB values for Tailwind opacity support
    root.style.setProperty('--universe-primary-rgb', hexToRgb(primary));
    root.style.setProperty('--universe-secondary-rgb', hexToRgb(secondary));
    root.style.setProperty('--universe-accent-rgb', hexToRgb(accent));

    // Cleanup on unmount or universe change
    return () => {
      root.style.setProperty(
        '--universe-primary-rgb',
        hexToRgb(DEFAULT_COLORS.primary)
      );
      root.style.setProperty(
        '--universe-secondary-rgb',
        hexToRgb(DEFAULT_COLORS.secondary)
      );
      root.style.setProperty(
        '--universe-accent-rgb',
        hexToRgb(DEFAULT_COLORS.accent)
      );
    };
  }, [universe]);

  return <>{children}</>;
}
