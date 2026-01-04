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
 * Default gradients for NBA universe (fallback)
 */
const DEFAULT_GRADIENTS = {
  primary: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
  glow: 'rgba(255, 56, 100, 0.4)',
};

/**
 * Default backgrounds for NBA universe (fallback)
 */
const DEFAULT_BACKGROUNDS = {
  main: '#0A0A0F', // Deep dark - arena darkness
  card: '#13131D', // Slightly lighter - scoreboard panels
  tint: 'rgba(255, 23, 68, 0.03)', // Subtle red tint
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

    // Get gradients from universe config, falling back to defaults
    const gradientPrimary =
      universe.colors?.gradients?.primary ?? DEFAULT_GRADIENTS.primary;
    const gradientGlow =
      universe.colors?.gradients?.glow ?? DEFAULT_GRADIENTS.glow;

    // Get backgrounds from universe config, falling back to defaults
    const bgMain =
      universe.colors?.backgrounds?.main ?? DEFAULT_BACKGROUNDS.main;
    const bgCard =
      universe.colors?.backgrounds?.card ?? DEFAULT_BACKGROUNDS.card;
    const bgTint =
      universe.colors?.backgrounds?.tint ?? DEFAULT_BACKGROUNDS.tint;

    // Set CSS variables as RGB values for Tailwind opacity support
    root.style.setProperty('--universe-primary-rgb', hexToRgb(primary));
    root.style.setProperty('--universe-secondary-rgb', hexToRgb(secondary));
    root.style.setProperty('--universe-accent-rgb', hexToRgb(accent));

    // Set gradient CSS variables
    root.style.setProperty('--universe-gradient-primary', gradientPrimary);
    root.style.setProperty('--universe-gradient-glow', gradientGlow);

    // Set background CSS variables
    root.style.setProperty('--universe-bg-main', bgMain);
    root.style.setProperty('--universe-bg-card', bgCard);
    root.style.setProperty('--universe-bg-tint', bgTint);

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
      root.style.setProperty(
        '--universe-gradient-primary',
        DEFAULT_GRADIENTS.primary
      );
      root.style.setProperty(
        '--universe-gradient-glow',
        DEFAULT_GRADIENTS.glow
      );
      root.style.setProperty('--universe-bg-main', DEFAULT_BACKGROUNDS.main);
      root.style.setProperty('--universe-bg-card', DEFAULT_BACKGROUNDS.card);
      root.style.setProperty('--universe-bg-tint', DEFAULT_BACKGROUNDS.tint);
    };
  }, [universe]);

  return <>{children}</>;
}
