import { Score } from '../score.value-object';

describe('Score', () => {
  it('should return 1000 for time > 25', () => {
    expect(Score.calculate(28, 0).basePoints).toBe(1000);
  });
  it('should apply streak multiplier', () => {
    expect(Score.calculate(28, 3).totalPoints).toBe(1450);
  });
  it('should return 100 for time < 5', () => {
    expect(Score.calculate(3, 0).basePoints).toBe(100);
  });
});
