import { Inject, Injectable } from '@nestjs/common';
import {
  ILeaderboardRepository,
  LEADERBOARD_REPOSITORY,
} from '../ports/leaderboard.repository.port';

export interface GetLeaderboardParams {
  limit?: number;
  playerScore?: number;
  universe?: string;
}

export interface GetLeaderboardResponse {
  entries: Array<{
    id: string;
    playerName: string;
    score: number;
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
  }>;
  playerPercentile?: number;
  totalPlayers?: number;
}

@Injectable()
export class GetLeaderboardUseCase {
  constructor(
    @Inject(LEADERBOARD_REPOSITORY)
    private readonly repo: ILeaderboardRepository
  ) {}

  async execute(
    params: GetLeaderboardParams = {}
  ): Promise<GetLeaderboardResponse> {
    const { limit = 10, playerScore, universe = 'nba' } = params;

    const entries = await this.repo.findTop(limit, universe);

    const result: GetLeaderboardResponse = {
      entries: entries.map((e) => ({
        id: e.id,
        playerName: e.playerName,
        score: e.score,
        gamesPlayed: e.gamesPlayed,
        gamesWon: e.gamesWon,
        currentStreak: e.currentStreak,
        maxStreak: e.maxStreak,
      })),
    };

    // Calculate percentile if playerScore is provided
    if (playerScore !== undefined) {
      const totalPlayers = await this.repo.countTotal(universe);
      if (totalPlayers > 0) {
        const playersBelow = await this.repo.countScoresBelow(
          playerScore,
          universe
        );
        const percentile = Math.round((playersBelow / totalPlayers) * 100);
        result.playerPercentile = percentile;
        result.totalPlayers = totalPlayers;
      }
    }

    return result;
  }
}
