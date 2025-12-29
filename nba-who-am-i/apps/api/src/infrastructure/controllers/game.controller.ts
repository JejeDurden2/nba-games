import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { StartGameUseCase } from '../../core/application/use-cases/start-game.use-case';
import { SubmitAnswerUseCase } from '../../core/application/use-cases/submit-answer.use-case';
import { GetLeaderboardUseCase } from '../../core/application/use-cases/get-leaderboard.use-case';

@Controller('game')
export class GameController {
  constructor(
    private readonly startGame: StartGameUseCase,
    private readonly submitAnswer: SubmitAnswerUseCase,
    private readonly getLeaderboard: GetLeaderboardUseCase
  ) {}

  @Post('start')
  start(@Body() req: { playerName: string; excludeCharacterIds?: string[] }) {
    return this.startGame.execute(req);
  }

  @Post('answer')
  answer(
    @Body()
    req: {
      characterId: string;
      guess: string;
      timeSpent: number;
      playerName: string;
    }
  ) {
    return this.submitAnswer.execute(req);
  }

  @Get('leaderboard')
  leaderboard(@Query('limit') limit?: string) {
    return this.getLeaderboard.execute(limit ? parseInt(limit) : 10);
  }
}
