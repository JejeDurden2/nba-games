/**
 * Default Design Values
 * Shared across all universes as fallbacks
 */

// Default gradients - Bold & Modern
export const DEFAULT_GRADIENTS = {
  fire: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
  ocean: 'linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)',
  gold: 'linear-gradient(135deg, #FFD600 0%, #FFA800 50%, #FF6B00 100%)',
  purple: 'linear-gradient(135deg, #C74CFF 0%, #FF49C0 100%)',
  green: 'linear-gradient(135deg, #00FF88 0%, #00D970 100%)',
} as const;

// Default colors
export const DEFAULT_COLORS = {
  ball: {
    400: '#FF3864',
    500: '#FF1744',
    600: '#D50032',
  },
  rim: {
    500: '#FF0054',
    600: '#D6004C',
  },
  dark: {
    900: '#0A0A0F',
    800: '#13131D',
    700: '#1E1E2E',
    600: '#2D2D44',
    500: '#45455F',
  },
  accent: {
    green: '#00FF88',
    yellow: '#FFD600',
    cyan: '#00E5FF',
    purple: '#C74CFF',
    pink: '#FF49C0',
  },
} as const;

// Default glows
export const DEFAULT_GLOWS = {
  fire: 'rgba(255,56,100,0.5)',
  ocean: 'rgba(0,229,255,0.5)',
  gold: 'rgba(255,214,0,0.5)',
  purple: 'rgba(199,76,255,0.5)',
  green: 'rgba(0,255,136,0.5)',
} as const;

// Achievement gradients for locked state
export const LOCKED_GRADIENT =
  'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)';

// Achievement level gradients
export const ACHIEVEMENT_GRADIENTS = {
  level1: DEFAULT_GRADIENTS.green,
  level2: 'linear-gradient(135deg, #00E5FF 0%, #0066FF 100%)',
  level3: 'linear-gradient(135deg, #C74CFF 0%, #8B5CF6 100%)',
  level4: 'linear-gradient(135deg, #FF49C0 0%, #FF0054 100%)',
  level5: DEFAULT_GRADIENTS.gold,
} as const;

// Achievement level glows
export const ACHIEVEMENT_GLOWS = {
  level1: 'rgba(0,255,136,0.6)',
  level2: 'rgba(0,229,255,0.6)',
  level3: 'rgba(199,76,255,0.6)',
  level4: 'rgba(255,73,192,0.6)',
  level5: 'rgba(255,214,0,0.8)',
} as const;
