import { CharacterType } from '../../api/game';

/**
 * Design Tokens for NBA Who Am I Game
 * Centralized design system tokens following Tailwind CSS conventions
 */

// Color Palette
export const colors = {
  ball: {
    400: '#FF6B35',
    500: '#E86A33',
    600: '#C94D1C',
  },
  rim: {
    500: '#DC2626',
    600: '#B91C1C',
  },
  nba: {
    blue: '#1D428A',
    red: '#C8102E',
  },
  dark: {
    900: '#09090B',
    800: '#18181B',
    700: '#27272A',
    600: '#3F3F46',
    500: '#52525B',
  },
  accent: {
    green: '#10B981',
    yellow: '#FBBF24',
    cyan: '#06B6D4',
  },
} as const;

// Gradients
export const gradients = {
  fire: 'linear-gradient(135deg, #FF6B35 0%, #DC2626 50%, #991B1B 100%)',
  ocean: 'linear-gradient(135deg, #1D428A 0%, #0EA5E9 100%)',
  gold: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
  purple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
  green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
} as const;

// Achievement Level Gradients
export const achievementGradients = {
  level1: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // green (beginner)
  level2: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', // blue (intermediate)
  level3: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', // purple (advanced)
  level4: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', // orange (expert)
  level5: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #EF4444 100%)', // gold (master)
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
    glow: 'rgba(16,185,129,0.5)',
    label: 'NOVICE',
    locked: 'linear-gradient(135deg, #52525B 0%, #3F3F46 100%)',
  },
  2: {
    gradient: achievementGradients.level2,
    glow: 'rgba(59,130,246,0.5)',
    label: 'APPRENTI',
    locked: 'linear-gradient(135deg, #52525B 0%, #3F3F46 100%)',
  },
  3: {
    gradient: achievementGradients.level3,
    glow: 'rgba(168,85,247,0.5)',
    label: 'EXPERT',
    locked: 'linear-gradient(135deg, #52525B 0%, #3F3F46 100%)',
  },
  4: {
    gradient: achievementGradients.level4,
    glow: 'rgba(245,158,11,0.5)',
    label: 'MAÎTRE',
    locked: 'linear-gradient(135deg, #52525B 0%, #3F3F46 100%)',
  },
  5: {
    gradient: achievementGradients.level5,
    glow: 'rgba(252,211,77,0.6)',
    label: 'LÉGENDE',
    locked: 'linear-gradient(135deg, #52525B 0%, #3F3F46 100%)',
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
    glow: 'rgba(255,107,53,0.4)',
    label: 'PLAYER',
    emoji: '🏀',
  },
  coach: {
    gradient: gradients.ocean,
    glow: 'rgba(29,66,138,0.4)',
    label: 'COACH',
    emoji: '📋',
  },
  legend: {
    gradient: gradients.gold,
    glow: 'rgba(251,191,36,0.4)',
    label: 'LEGEND',
    emoji: '👑',
  },
  executive: {
    gradient: gradients.purple,
    glow: 'rgba(139,92,246,0.4)',
    label: 'EXEC',
    emoji: '👔',
  },
} as const;

// Type exports for consumers
export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
export type BreakpointKey = keyof typeof breakpoints;
