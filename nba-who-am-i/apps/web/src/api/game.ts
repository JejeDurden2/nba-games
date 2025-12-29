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
  playerPercentile?: number;
  totalPlayers?: number;
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
    excludeCharacterIds: string[] = [],
    difficulty?: number
  ): Promise<StartGameResponse> {
    return this.fetch<StartGameResponse>('/api/game/start', {
      method: 'POST',
      body: JSON.stringify({ playerName, excludeCharacterIds, difficulty }),
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

  async getLeaderboard(
    limit = 10,
    playerScore?: number
  ): Promise<LeaderboardResponse> {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (playerScore !== undefined) {
      params.append('playerScore', playerScore.toString());
    }
    return this.fetch<LeaderboardResponse>(
      `/api/game/leaderboard?${params.toString()}`
    );
  }
}

export const gameApi = new GameApiClient();
