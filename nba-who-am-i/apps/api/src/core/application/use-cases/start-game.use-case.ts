import { Inject, Injectable } from '@nestjs/common';
import {
  ICharacterRepository,
  CHARACTER_REPOSITORY,
} from '../ports/character.repository.port';
import {
  ILeaderboardRepository,
  LEADERBOARD_REPOSITORY,
} from '../ports/leaderboard.repository.port';
import { LeaderboardEntryEntity } from '../../domain/entities/leaderboard-entry.entity';

@Injectable()
export class StartGameUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repo: ICharacterRepository,
    @Inject(LEADERBOARD_REPOSITORY)
    private readonly lbRepo: ILeaderboardRepository
  ) {}

  async execute(req: {
    playerName: string;
    excludeCharacterIds?: string[];
    difficulty?: number;
  }) {
    const sessionId = crypto.randomUUID();
    const playerName = req.playerName?.trim() || 'Anonymous';

    // Create new leaderboard entry for this game session
    const entry = LeaderboardEntryEntity.create(sessionId, playerName);
    await this.lbRepo.save(entry);

    // Get random character
    const character = await this.repo.findRandom(
      req.excludeCharacterIds,
      req.difficulty
    );

    return {
      sessionId,
      character: character.toResponse(),
    };
  }
}
