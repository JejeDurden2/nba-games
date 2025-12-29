import { Inject, Injectable } from '@nestjs/common';
import {
  ICharacterRepository,
  CHARACTER_REPOSITORY,
} from '../ports/character.repository.port';

@Injectable()
export class StartGameUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY) private readonly repo: ICharacterRepository
  ) {}

  async execute(req: { playerName: string; excludeCharacterIds?: string[] }) {
    const character = await this.repo.findRandom(req.excludeCharacterIds);
    return {
      sessionId: crypto.randomUUID(),
      character: character.toResponse(),
    };
  }
}
