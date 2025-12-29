import { Inject, Injectable } from '@nestjs/common';
import {
  ILeaderboardRepository,
  LEADERBOARD_REPOSITORY,
} from '../ports/leaderboard.repository.port';

@Injectable()
export class GetLeaderboardUseCase {
  constructor(
    @Inject(LEADERBOARD_REPOSITORY)
    private readonly repo: ILeaderboardRepository
  ) {}

  async execute(limit = 10) {
    const entries = await this.repo.findTop(limit);
    return {
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
  }
}
