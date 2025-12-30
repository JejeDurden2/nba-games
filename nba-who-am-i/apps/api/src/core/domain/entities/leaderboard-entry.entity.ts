export class LeaderboardEntryEntity {
  private constructor(
    public readonly id: string,
    public readonly sessionId: string,
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

  static create(sessionId: string, playerName: string): LeaderboardEntryEntity {
    if (!sessionId?.trim()) throw new Error('Session ID is required');
    if (!playerName?.trim()) throw new Error('Player name is required');
    const now = new Date();
    return new LeaderboardEntryEntity(
      crypto.randomUUID(), // id
      sessionId.trim(), // sessionId
      playerName.trim(), // playerName
      0, // score
      0, // gamesPlayed
      0, // gamesWon
      0, // currentStreak
      0, // maxStreak
      now, // createdAt
      now // updatedAt
    );
  }

  static fromPersistence(data: {
    id: string;
    sessionId: string;
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
      data.sessionId,
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
