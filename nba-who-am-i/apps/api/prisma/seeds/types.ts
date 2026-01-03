/**
 * Shared types for seed data
 */

export interface CharacterSeed {
  name: string;
  type: string;
  difficulty: number;
  hints: string[];
  universe: string;
}

export interface UniverseSeedConfig {
  id: string;
  characters: CharacterSeed[];
}
