import { AnswerCheckerService } from '../answer-checker.service';

describe('AnswerCheckerService', () => {
  it('should match exact name', () => {
    expect(AnswerCheckerService.isCorrect('LeBron James', 'LeBron James')).toBe(
      true
    );
  });
  it('should match case-insensitive', () => {
    expect(AnswerCheckerService.isCorrect('lebron james', 'LeBron James')).toBe(
      true
    );
  });
  it('should match last name only', () => {
    expect(AnswerCheckerService.isCorrect('james', 'LeBron James')).toBe(true);
  });
  it('should reject wrong answer', () => {
    expect(AnswerCheckerService.isCorrect('Kobe Bryant', 'LeBron James')).toBe(
      false
    );
  });
});
