const API_BASE = import.meta.env.VITE_API_URL || '/api';

export type CharacterType = 'player' | 'coach' | 'executive' | 'legend';

export interface GameCharacter {
  id: string;
  name: string;
  type: CharacterType;
  hints: string[];
}

export interface StartGameResponse {
  sessionId: string;
  character: GameCharacter;
}

export interface SubmitAnswerResponse {
  correct: boolean;
  answer: string;
  score: number;
  streak: number;
  totalScore: number;
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

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}

class GameApiClient {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  async startGame(
    playerName: string,
    excludeCharacterIds: string[] = []
  ): Promise<StartGameResponse> {
    return this.fetch<StartGameResponse>('/api/game/start', {
      method: 'POST',
      body: JSON.stringify({ playerName, excludeCharacterIds }),
    });
  }

  async submitAnswer(params: {
    sessionId: string;
    characterId: string;
    guess: string;
    timeSpent: number;
    playerName: string;
  }): Promise<SubmitAnswerResponse> {
    return this.fetch<SubmitAnswerResponse>('/api/game/answer', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getLeaderboard(limit = 10): Promise<LeaderboardResponse> {
    return this.fetch<LeaderboardResponse>(
      `/api/game/leaderboard?limit=${limit}`
    );
  }
}

export const gameApi = new GameApiClient();
