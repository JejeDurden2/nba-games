import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { characterTypeConfig } from '@/lib/design-system/tokens';
import { CharacterType } from '@/api/game';

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

  // Determine input state based on guess feedback
  const inputState = wrongGuess
    ? 'error'
    : correctGuess
      ? 'success'
      : 'default';

  return (
    <div className="flex gap-3">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Une idée ?"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        state={inputState}
        className="flex-1"
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
