import { LeaderboardEntryEntity } from '../../domain/entities/leaderboard-entry.entity';

export interface ILeaderboardRepository {
  findByPlayerName(name: string): Promise<LeaderboardEntryEntity | null>;
  findTop(limit: number): Promise<LeaderboardEntryEntity[]>;
  save(entry: LeaderboardEntryEntity): Promise<LeaderboardEntryEntity>;
  findOrCreate(playerName: string): Promise<LeaderboardEntryEntity>;
  countTotal(): Promise<number>;
  countScoresBelow(score: number): Promise<number>;
}

export const LEADERBOARD_REPOSITORY = Symbol('ILeaderboardRepository');
