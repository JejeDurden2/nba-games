export class LeaderboardEntryEntity {
  private constructor(
    public readonly id: string,
    public readonly playerName: string,
    private _score: number,
    private _gamesPlayed: number,
    private _gamesWon: number,
    private _currentStreak: number,
    private _maxStreak: number,
    public readonly createdAt: Date,
    private _updatedAt: Date
  ) {}

  get score() {
    return this._score;
  }
  get gamesPlayed() {
    return this._gamesPlayed;
  }
  get gamesWon() {
    return this._gamesWon;
  }
  get currentStreak() {
    return this._currentStreak;
  }
  get maxStreak() {
    return this._maxStreak;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static create(playerName: string): LeaderboardEntryEntity {
    if (!playerName?.trim()) throw new Error('Player name is required');
    const now = new Date();
    return new LeaderboardEntryEntity(
      crypto.randomUUID(),
      playerName.trim(),
      0,
      0,
      0,
      0,
      0,
      now,
      now
    );
  }

  static fromPersistence(data: {
    id: string;
    playerName: string;
    score: number;
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
    createdAt: Date;
    updatedAt: Date;
  }): LeaderboardEntryEntity {
    return new LeaderboardEntryEntity(
      data.id,
      data.playerName,
      data.score,
      data.gamesPlayed,
      data.gamesWon,
      data.currentStreak,
      data.maxStreak,
      data.createdAt,
      data.updatedAt
    );
  }

  recordGame(won: boolean, points: number): void {
    this._gamesPlayed++;
    this._score += points;
    this._updatedAt = new Date();
    if (won) {
      this._gamesWon++;
      this._currentStreak++;
      this._maxStreak = Math.max(this._maxStreak, this._currentStreak);
    } else {
      this._currentStreak = 0;
    }
  }
}
