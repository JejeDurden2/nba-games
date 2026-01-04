import React, { createContext, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  UniverseConfig,
  UniverseWording,
  CharacterTypeConfig,
  AchievementLabels,
  AchievementGradientConfig,
  getUniverse,
  hasUniverse,
} from '@nba-who-am-i/shared';
import { detectUniverse } from '@/lib/universe';
import { achievementGradientConfig as defaultAchievementGradients } from '@/lib/design-system/tokens';

/**
 * Context value interface
 */
interface UniverseContextValue {
  universe: UniverseConfig;
  universeId: string;
  wording: UniverseWording;
  characterTypes: Record<string, CharacterTypeConfig>;
  achievementLabels: AchievementLabels;
  achievementGradients: Record<1 | 2 | 3 | 4 | 5, AchievementGradientConfig>;
}

const UniverseContext = createContext<UniverseContextValue | null>(null);

/**
 * Props for UniverseProvider
 */
interface UniverseProviderProps {
  children: React.ReactNode;
  /** Optional override for universe ID (used in testing) */
  universeId?: string;
}

/**
 * Universe Provider Component
 * Provides universe configuration to all child components
 *
 * Detection priority:
 * 1. Route parameter (:universe from React Router)
 * 2. Manual override prop
 * 3. Auto-detection (URL path, subdomain, query param, env var)
 */
export function UniverseProvider({
  children,
  universeId: overrideId,
}: UniverseProviderProps) {
  // Try to get universe from route params first
  const params = useParams<{ universe?: string }>();

  const value = useMemo(() => {
    // Priority: route param → override prop → auto-detect
    let detectedId: string;

    if (params.universe && hasUniverse(params.universe)) {
      detectedId = params.universe;
    } else if (overrideId && hasUniverse(overrideId)) {
      detectedId = overrideId;
    } else {
      detectedId = detectUniverse();
    }

    const universe = getUniverse(detectedId);

    // Use universe-specific achievement gradients if available, otherwise use defaults
    const achievementGradients =
      universe.achievementGradients ?? defaultAchievementGradients;

    return {
      universe,
      universeId: detectedId,
      wording: universe.wording,
      characterTypes: universe.characterTypes,
      achievementLabels: universe.achievementLabels,
      achievementGradients,
    };
  }, [params.universe, overrideId]);

  return (
    <UniverseContext.Provider value={value}>
      {children}
    </UniverseContext.Provider>
  );
}

/**
 * Hook to access the full universe configuration
 */
export function useUniverse(): UniverseConfig {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useUniverse must be used within UniverseProvider');
  }
  return context.universe;
}

/**
 * Hook to access the current universe ID
 */
export function useUniverseId(): string {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useUniverseId must be used within UniverseProvider');
  }
  return context.universeId;
}

/**
 * Hook to access universe wording (all translatable strings)
 */
export function useWording(): UniverseWording {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useWording must be used within UniverseProvider');
  }
  return context.wording;
}

/**
 * Hook to access character type configurations
 */
export function useCharacterTypes(): Record<string, CharacterTypeConfig> {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error('useCharacterTypes must be used within UniverseProvider');
  }
  return context.characterTypes;
}

/**
 * Hook to get a specific character type config
 * Falls back to first character type if not found
 */
export function useCharacterType(type: string): CharacterTypeConfig {
  const characterTypes = useCharacterTypes();
  return characterTypes[type] ?? Object.values(characterTypes)[0];
}

/**
 * Hook to access achievement labels
 */
export function useAchievementLabels(): AchievementLabels {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error(
      'useAchievementLabels must be used within UniverseProvider'
    );
  }
  return context.achievementLabels;
}

/**
 * Hook to access achievement gradients (universe-specific or default)
 */
export function useAchievementGradients(): Record<
  1 | 2 | 3 | 4 | 5,
  AchievementGradientConfig
> {
  const context = useContext(UniverseContext);
  if (!context) {
    throw new Error(
      'useAchievementGradients must be used within UniverseProvider'
    );
  }
  return context.achievementGradients;
}
