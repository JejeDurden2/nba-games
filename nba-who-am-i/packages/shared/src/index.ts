// Universe system exports
export * from './universe';

// Legacy character type - now universe-specific, kept for backward compatibility
export type CharacterType = 'player' | 'coach' | 'executive' | 'legend';

export interface Character {
  id: string;
  name: string;
  type: string; // Changed from CharacterType to string for universe flexibility
  hints: string[];
  difficulty: number;
  universe?: string; // Optional for backward compatibility
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
}

export interface StartGameRequest {
  playerName: string;
  excludeCharacterIds?: string[];
  difficulty?: number;
  universe?: string;
}

export interface StartGameResponse {
  sessionId: string;
  character: { id: string; type: string; hints: string[] };
  universe?: string;
}

export interface SubmitAnswerRequest {
  sessionId: string;
  characterId: string;
  guess: string;
  timeSpent: number;
  playerName: string;
}

export interface SubmitAnswerResponse {
  correct: boolean;
  answer: string;
  score: number;
  streak: number;
  totalScore: number;
}
