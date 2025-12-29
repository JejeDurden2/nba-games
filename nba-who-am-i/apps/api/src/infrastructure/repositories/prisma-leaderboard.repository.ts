import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILeaderboardRepository } from '../../core/application/ports/leaderboard.repository.port';
import { LeaderboardEntryEntity } from '../../core/domain/entities/leaderboard-entry.entity';

@Injectable()
export class PrismaLeaderboardRepository implements ILeaderboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByPlayerName(name: string) {
    const d = await this.prisma.leaderboardEntry.findUnique({
      where: { playerName: name },
    });
    return d ? LeaderboardEntryEntity.fromPersistence(d) : null;
  }

  async findTop(limit: number) {
    const d = await this.prisma.leaderboardEntry.findMany({
      take: limit,
      orderBy: { score: 'desc' },
    });
    return d.map((x: (typeof d)[number]) =>
      LeaderboardEntryEntity.fromPersistence(x)
    );
  }

  async save(e: LeaderboardEntryEntity) {
    const d = await this.prisma.leaderboardEntry.upsert({
      where: { playerName: e.playerName },
      update: {
        score: e.score,
        gamesPlayed: e.gamesPlayed,
        gamesWon: e.gamesWon,
        currentStreak: e.currentStreak,
        maxStreak: e.maxStreak,
      },
      create: {
        id: e.id,
        playerName: e.playerName,
        score: e.score,
        gamesPlayed: e.gamesPlayed,
        gamesWon: e.gamesWon,
        currentStreak: e.currentStreak,
        maxStreak: e.maxStreak,
      },
    });
    return LeaderboardEntryEntity.fromPersistence(d);
  }

  async findOrCreate(playerName: string) {
    const existing = await this.findByPlayerName(playerName);
    if (existing) return existing;
    return this.save(LeaderboardEntryEntity.create(playerName));
  }

  async countTotal() {
    return this.prisma.leaderboardEntry.count();
  }

  async countScoresBelow(score: number) {
    return this.prisma.leaderboardEntry.count({
      where: { score: { lt: score } },
    });
  }
}
