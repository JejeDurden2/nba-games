import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILeaderboardRepository } from '../../core/application/ports/leaderboard.repository.port';
import { LeaderboardEntryEntity } from '../../core/domain/entities/leaderboard-entry.entity';

@Injectable()
export class PrismaLeaderboardRepository implements ILeaderboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlayerName(name: string, universe: string = 'nba') {
    const d = await this.prisma.leaderboardEntry.findFirst({
      where: { playerName: name, universe },
      orderBy: { createdAt: 'desc' },
    });
    return d ? LeaderboardEntryEntity.fromPersistence(d) : null;
  }

  async findBySessionId(sessionId: string) {
    const d = await this.prisma.leaderboardEntry.findUnique({
      where: { sessionId },
    });
    return d ? LeaderboardEntryEntity.fromPersistence(d) : null;
  }

  async findTop(limit: number, universe: string = 'nba') {
    const d = await this.prisma.leaderboardEntry.findMany({
      where: { universe },
      take: limit,
      orderBy: { score: 'desc' },
    });
    return d.map((x: (typeof d)[number]) =>
      LeaderboardEntryEntity.fromPersistence(x)
    );
  }

  async save(e: LeaderboardEntryEntity) {
    const d = await this.prisma.leaderboardEntry.upsert({
      where: { sessionId: e.sessionId },
      update: {
        score: e.score,
        gamesPlayed: e.gamesPlayed,
        gamesWon: e.gamesWon,
        currentStreak: e.currentStreak,
        maxStreak: e.maxStreak,
      },
      create: {
        id: e.id,
        sessionId: e.sessionId,
        playerName: e.playerName,
        universe: e.universe,
        score: e.score,
        gamesPlayed: e.gamesPlayed,
        gamesWon: e.gamesWon,
        currentStreak: e.currentStreak,
        maxStreak: e.maxStreak,
      },
    });
    return LeaderboardEntryEntity.fromPersistence(d);
  }

  async findOrCreate(playerName: string, universe: string = 'nba') {
    // This method is now deprecated - kept for backwards compatibility
    // New code should create entries at game start with session ID
    const existing = await this.findByPlayerName(playerName, universe);
    if (existing) return existing;
    // Generate a temporary sessionId for legacy compatibility
    const sessionId = crypto.randomUUID();
    return this.save(
      LeaderboardEntryEntity.create(sessionId, playerName, universe)
    );
  }

  async countTotal(universe: string = 'nba') {
    return this.prisma.leaderboardEntry.count({
      where: { universe },
    });
  }

  async countScoresBelow(score: number, universe: string = 'nba') {
    return this.prisma.leaderboardEntry.count({
      where: {
        score: { lt: score },
        universe,
      },
    });
  }
}
