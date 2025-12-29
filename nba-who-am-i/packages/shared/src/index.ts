export type CharacterType = 'player' | 'coach' | 'executive' | 'legend';

export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  hints: string[];
  difficulty: number;
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
}

export interface StartGameResponse {
  sessionId: string;
  character: { id: string; type: CharacterType; hints: string[] };
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
