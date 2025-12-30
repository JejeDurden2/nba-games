import { CharacterType } from '../../api/game';
import { StatsBar } from '../game/StatsBar';
import { CharacterBadge } from '../game/CharacterBadge';
import { Timer } from '../game/Timer';
import { HintsDisplay } from '../game/HintsDisplay';
import { GuessInput } from '../game/GuessInput';

export interface PlayingScreenProps {
  displayedText: string;
  timeLeft: number;
  characterType: CharacterType;
  calculatePotentialScore: (time: number) => number;
  guess: string;
  setGuess: (guess: string) => void;
  submitGuess: () => void;
  wrongGuess: boolean;
  correctGuess: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onQuit: () => void;
  round: number;
  streak: number;
  totalScore: number;
  failuresThisRound: number;
  difficulty: number;
  questionsAtDifficulty: number;
}

/**
 * Active gameplay screen composing all game components
 */
export function PlayingScreen({
  displayedText,
  timeLeft,
  characterType,
  calculatePotentialScore,
  guess,
  setGuess,
  submitGuess,
  wrongGuess,
  correctGuess,
  inputRef,
  onQuit,
  round,
  streak,
  totalScore,
  failuresThisRound,
  difficulty,
  questionsAtDifficulty,
}: PlayingScreenProps) {
  return (
    <div className="flex flex-col">
      {/* Stats Bar */}
      <StatsBar
        round={round}
        streak={streak}
        totalScore={totalScore}
        difficulty={difficulty}
        questionsAtDifficulty={questionsAtDifficulty}
        failuresThisRound={failuresThisRound}
        onQuit={onQuit}
      />

      {/* Character Badge & Timer */}
      <div className="flex justify-between items-start mb-4 flex-wrap gap-3 shrink-0">
        <CharacterBadge type={characterType} />
        <div className="flex-1 min-w-0">
          <Timer
            timeLeft={timeLeft}
            calculatePotentialScore={calculatePotentialScore}
          />
        </div>
      </div>

      {/* Hints Display */}
      <div className="mb-4 shrink-0">
        <HintsDisplay displayedText={displayedText} />
      </div>

      {/* Guess Input */}
      <div className="shrink-0">
        <GuessInput
          guess={guess}
          setGuess={setGuess}
          onSubmit={submitGuess}
          wrongGuess={wrongGuess}
          correctGuess={correctGuess}
          inputRef={inputRef}
          characterType={characterType}
        />
      </div>
    </div>
  );
}
