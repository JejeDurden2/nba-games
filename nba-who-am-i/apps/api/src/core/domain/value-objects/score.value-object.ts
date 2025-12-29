export class Score {
  private static readonly THRESHOLDS = [
    { minTime: 25, points: 1000 },
    { minTime: 20, points: 800 },
    { minTime: 15, points: 600 },
    { minTime: 10, points: 400 },
    { minTime: 5, points: 200 },
    { minTime: 0, points: 100 },
  ];

  private constructor(
    public readonly basePoints: number,
    public readonly streakMultiplier: number,
    public readonly totalPoints: number
  ) {
    Object.freeze(this);
  }

  static calculate(timeRemaining: number, streak: number): Score {
    const t = Math.max(0, Math.min(30, timeRemaining));
    const threshold = this.THRESHOLDS.find((th) => t >= th.minTime);
    const base = threshold?.points ?? 100;
    const mult = 1 + streak * 0.15;
    return new Score(base, mult, Math.round(base * mult));
  }

  static zero(): Score {
    return new Score(0, 1, 0);
  }
}
