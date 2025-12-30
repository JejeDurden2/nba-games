import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ICharacterRepository,
  CHARACTER_REPOSITORY,
} from '../ports/character.repository.port';
import {
  ILeaderboardRepository,
  LEADERBOARD_REPOSITORY,
} from '../ports/leaderboard.repository.port';
import { AnswerCheckerService } from '../../domain/services/answer-checker.service';
import { Score } from '../../domain/value-objects/score.value-object';

@Injectable()
export class SubmitAnswerUseCase {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly charRepo: ICharacterRepository,
    @Inject(LEADERBOARD_REPOSITORY)
    private readonly lbRepo: ILeaderboardRepository
  ) {}

  async execute(req: {
    sessionId: string;
    characterId: string;
    guess: string;
    timeSpent: number;
    playerName: string;
  }) {
    const char = await this.charRepo.findById(req.characterId);
    if (!char) throw new NotFoundException('Character not found');

    // Find entry by sessionId (created at game start)
    const entry = await this.lbRepo.findBySessionId(req.sessionId);
    if (!entry) throw new NotFoundException('Game session not found');

    const correct = AnswerCheckerService.isCorrect(req.guess, char.name);
    const score = correct
      ? Score.calculate(30 - req.timeSpent, entry.currentStreak)
      : Score.zero();

    entry.recordGame(correct, score.totalPoints);
    await this.lbRepo.save(entry);

    return {
      correct,
      answer: char.name,
      score: score.totalPoints,
      streak: entry.currentStreak,
      totalScore: entry.score,
    };
  }
}
