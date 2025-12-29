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
