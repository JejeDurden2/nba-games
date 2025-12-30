import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Button } from '../ui/Button';
import { characterTypeConfig } from '../../lib/design-system/tokens';
import { CharacterType } from '../../api/game';

export interface GuessInputProps {
  guess: string;
  setGuess: (guess: string) => void;
  onSubmit: () => void;
  wrongGuess: boolean;
  correctGuess: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  characterType: CharacterType;
}

/**
 * Input field and submit button for guessing the character
 */
export function GuessInput({
  guess,
  setGuess,
  onSubmit,
  wrongGuess,
  correctGuess,
  inputRef,
  characterType,
}: GuessInputProps) {
  const isMobile = useIsMobile();
  const config = characterTypeConfig[characterType];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <input
        ref={inputRef}
        type="text"
        placeholder="Une idée ?"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex-1',
          'bg-dark-800 border-2 rounded-2xl',
          'text-white placeholder-dark-500',
          'outline-none transition-all',
          isMobile ? 'px-4 py-3.5 text-base' : 'px-6 py-4.5 text-lg',
          wrongGuess
            ? 'border-rim-500 animate-shake'
            : correctGuess
              ? 'border-accent-green bg-accent-green/10'
              : 'border-dark-600 focus:border-white/20'
        )}
      />
      <Button
        onClick={onSubmit}
        size="lg"
        gradient={config.gradient}
        glow={config.glow}
        className={cn(
          '!px-0 flex items-center justify-center',
          isMobile ? 'w-16 min-w-16' : 'w-20 min-w-20'
        )}
      >
        <span className={isMobile ? 'text-3xl' : 'text-2xl'}>→</span>
      </Button>
    </div>
  );
}
