import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { PrismaCharacterRepository } from './infrastructure/repositories/prisma-character.repository';
import { PrismaLeaderboardRepository } from './infrastructure/repositories/prisma-leaderboard.repository';
import { GameController } from './infrastructure/controllers/game.controller';
import { StartGameUseCase } from './core/application/use-cases/start-game.use-case';
import { SubmitAnswerUseCase } from './core/application/use-cases/submit-answer.use-case';
import { GetLeaderboardUseCase } from './core/application/use-cases/get-leaderboard.use-case';
import { CHARACTER_REPOSITORY } from './core/application/ports/character.repository.port';
import { LEADERBOARD_REPOSITORY } from './core/application/ports/leaderboard.repository.port';

@Module({
  controllers: [GameController],
  providers: [
    PrismaService,
    StartGameUseCase,
    SubmitAnswerUseCase,
    GetLeaderboardUseCase,
    { provide: CHARACTER_REPOSITORY, useClass: PrismaCharacterRepository },
    { provide: LEADERBOARD_REPOSITORY, useClass: PrismaLeaderboardRepository },
  ],
})
export class AppModule {}
