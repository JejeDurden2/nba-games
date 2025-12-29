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
            : 'border-dark-600 focus:border-white/20'
        )}
      />
      <Button
        onClick={onSubmit}
        size={isMobile ? 'md' : 'lg'}
        gradient={config.gradient}
        glow={config.glow}
        className="aspect-square !px-0"
      >
        <span className={isMobile ? 'text-xl' : 'text-2xl'}>→</span>
      </Button>
    </div>
  );
}
