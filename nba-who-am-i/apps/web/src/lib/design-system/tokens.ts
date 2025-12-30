import { CharacterType } from '../../api/game';

/**
 * Design Tokens for NBA Who Am I Game
 * Centralized design system tokens following Tailwind CSS conventions
 */

// Color Palette - Modern & Vibrant
export const colors = {
  ball: {
    400: '#FF3864', // Hot pink/electric red
    500: '#FF1744', // Neon red
    600: '#D50032', // Deep red
  },
  rim: {
    500: '#FF0054', // Electric magenta
    600: '#D6004C', // Deep magenta
  },
  nba: {
    blue: '#0066FF', // Electric blue
    red: '#FF0054', // Hot red
  },
  dark: {
    900: '#0A0A0F', // Deep purple-black
    800: '#13131D', // Dark purple-gray
    700: '#1E1E2E', // Purple-gray
    600: '#2D2D44', // Medium purple-gray
    500: '#45455F', // Light purple-gray
  },
  accent: {
    green: '#00FF88', // Neon green/mint
    yellow: '#FFD600', // Electric yellow
    cyan: '#00E5FF', // Cyan/aqua neon
    purple: '#C74CFF', // Electric purple
    pink: '#FF49C0', // Hot pink
  },
} as const;

// Gradients - Bold & Modern
export const gradients = {
  fire: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)', // Hot pink to magenta
  ocean: 'linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)', // Electric blue to cyan
  gold: 'linear-gradient(135deg, #FFD600 0%, #FFA800 50%, #FF6B00 100%)', // Electric yellow to orange
  purple: 'linear-gradient(135deg, #C74CFF 0%, #FF49C0 100%)', // Purple to hot pink
  green: 'linear-gradient(135deg, #00FF88 0%, #00D970 100%)', // Neon mint to green
} as const;

// Achievement Level Gradients - High Impact
export const achievementGradients = {
  level1: 'linear-gradient(135deg, #00FF88 0%, #00D970 100%)', // Neon green (beginner)
  level2: 'linear-gradient(135deg, #00E5FF 0%, #0066FF 100%)', // Cyan to blue (intermediate)
  level3: 'linear-gradient(135deg, #C74CFF 0%, #8B5CF6 100%)', // Electric purple (advanced)
  level4: 'linear-gradient(135deg, #FF49C0 0%, #FF0054 100%)', // Hot pink to magenta (expert)
  level5: 'linear-gradient(135deg, #FFD600 0%, #FFA800 50%, #FF3864 100%)', // Gold to hot pink (GOAT)
} as const;

// Achievement Level Configuration
export interface AchievementLevelConfig {
  gradient: string;
  glow: string;
  label: string;
  locked: string; // grayscale gradient
}

export const achievementLevelConfig: Record<
  1 | 2 | 3 | 4 | 5,
  AchievementLevelConfig
> = {
  1: {
    gradient: achievementGradients.level1,
    glow: 'rgba(0,255,136,0.6)', // Neon green glow
    label: 'ROOKIE',
    locked: 'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)',
  },
  2: {
    gradient: achievementGradients.level2,
    glow: 'rgba(0,229,255,0.6)', // Cyan glow
    label: 'STARTER',
    locked: 'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)',
  },
  3: {
    gradient: achievementGradients.level3,
    glow: 'rgba(199,76,255,0.6)', // Purple glow
    label: 'ALL-STAR',
    locked: 'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)',
  },
  4: {
    gradient: achievementGradients.level4,
    glow: 'rgba(255,73,192,0.6)', // Pink glow
    label: 'MVP',
    locked: 'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)',
  },
  5: {
    gradient: achievementGradients.level5,
    glow: 'rgba(255,214,0,0.8)', // Gold glow (stronger)
    label: 'GOAT',
    locked: 'linear-gradient(135deg, #45455F 0%, #2D2D44 100%)',
  },
} as const;

// Breakpoints (px)
export const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
} as const;

// Character Type Configuration
export interface CharacterTypeConfig {
  gradient: string;
  glow: string;
  label: string;
  emoji: string;
}

export const characterTypeConfig: Record<CharacterType, CharacterTypeConfig> = {
  player: {
    gradient: gradients.fire,
    glow: 'rgba(255,56,100,0.5)', // Hot pink glow
    label: 'PLAYER',
    emoji: '🏀',
  },
  coach: {
    gradient: gradients.ocean,
    glow: 'rgba(0,229,255,0.5)', // Cyan glow
    label: 'COACH',
    emoji: '📋',
  },
  legend: {
    gradient: gradients.gold,
    glow: 'rgba(255,214,0,0.5)', // Gold glow
    label: 'LEGEND',
    emoji: '👑',
  },
  executive: {
    gradient: gradients.purple,
    glow: 'rgba(199,76,255,0.5)', // Purple glow
    label: 'EXEC',
    emoji: '👔',
  },
} as const;

// Type exports for consumers
export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
export type BreakpointKey = keyof typeof breakpoints;
