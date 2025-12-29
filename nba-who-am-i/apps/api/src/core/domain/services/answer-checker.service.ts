export class AnswerCheckerService {
  static isCorrect(guess: string, correctAnswer: string): boolean {
    if (!guess || !correctAnswer) return false;
    const g = this.normalize(guess);
    const a = this.normalize(correctAnswer);
    const lastName = a.split(' ').pop() || '';
    return a.includes(g) || g.includes(lastName) || g === lastName;
  }

  private static normalize(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
