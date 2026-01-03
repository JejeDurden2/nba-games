/**
 * Universe Registry and Exports
 * Central hub for universe management
 */

export * from './types';
export * from './defaults';
export { nbaUniverse } from './universes/nba';
export { onePieceUniverse } from './universes/one-piece';

import { UniverseConfig } from './types';
import { nbaUniverse } from './universes/nba';
import { onePieceUniverse } from './universes/one-piece';

// Registry of all available universes
const universeRegistry = new Map<string, UniverseConfig>();

// Register default universes
universeRegistry.set(nbaUniverse.id, nbaUniverse);
universeRegistry.set(onePieceUniverse.id, onePieceUniverse);

/**
 * Get a universe configuration by ID
 * Falls back to NBA if not found
 */
export function getUniverse(id: string): UniverseConfig {
  return universeRegistry.get(id) ?? nbaUniverse;
}

/**
 * Check if a universe exists
 */
export function hasUniverse(id: string): boolean {
  return universeRegistry.has(id);
}

/**
 * Get all available universes
 */
export function getAvailableUniverses(): UniverseConfig[] {
  return Array.from(universeRegistry.values());
}

/**
 * Get all universe IDs
 */
export function getUniverseIds(): string[] {
  return Array.from(universeRegistry.keys());
}

/**
 * Register a new universe
 * Used for dynamically adding universes
 */
export function registerUniverse(config: UniverseConfig): void {
  universeRegistry.set(config.id, config);
}

/**
 * Get the default universe (NBA)
 */
export function getDefaultUniverse(): UniverseConfig {
  return nbaUniverse;
}
