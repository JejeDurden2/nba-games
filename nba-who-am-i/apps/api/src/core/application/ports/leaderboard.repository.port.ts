import { LeaderboardEntryEntity } from '../../domain/entities/leaderboard-entry.entity';

export interface ILeaderboardRepository {
  findByPlayerName(
    name: string,
    universe?: string
  ): Promise<LeaderboardEntryEntity | null>;
  findBySessionId(sessionId: string): Promise<LeaderboardEntryEntity | null>;
  findTop(limit: number, universe?: string): Promise<LeaderboardEntryEntity[]>;
  save(entry: LeaderboardEntryEntity): Promise<LeaderboardEntryEntity>;
  findOrCreate(
    playerName: string,
    universe?: string
  ): Promise<LeaderboardEntryEntity>;
  countTotal(universe?: string): Promise<number>;
  countScoresBelow(score: number, universe?: string): Promise<number>;
}

export const LEADERBOARD_REPOSITORY = Symbol('ILeaderboardRepository');
