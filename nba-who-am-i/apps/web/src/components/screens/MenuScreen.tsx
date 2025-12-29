import { LeaderboardEntry } from '../../api/game';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Leaderboard } from '../ui/Leaderboard';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface MenuScreenProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  leaderboard: LeaderboardEntry[];
  error: string | null;
  isLoading: boolean;
}

/**
 * Main menu screen with player name input and leaderboard
 */
export function MenuScreen({
  playerName,
  setPlayerName,
  startGame,
  leaderboard,
  error,
  isLoading,
}: MenuScreenProps) {
  const isMobile = useIsMobile();

  return (
    <Card className={isMobile ? 'p-6' : 'p-10'}>
      <div className="text-center mb-8">
        <div className={cn('mb-4', isMobile ? 'text-5xl' : 'text-6xl')}>🏀</div>
        <h2
          className={cn(
            'font-black text-white mb-2',
            isMobile ? 'text-2xl' : 'text-3xl'
          )}
        >
          NBA WHO AM I?
        </h2>
        <p className={cn('text-dark-500', isMobile ? 'text-sm' : 'text-base')}>
          Penses-tu avoir le basketball IQ pour reconnaitre ces légendes? 👀
        </p>
      </div>

      {/* Player name input and start button - centered with max width */}
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label
            htmlFor="playerName"
            className={cn(
              'block text-dark-500 mb-2',
              isMobile ? 'text-sm' : 'text-base'
            )}
          >
            Qui ose me défier?
          </label>
          <input
            id="playerName"
            type="text"
            placeholder="Un rookie anonyme"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className={cn(
              'w-full bg-dark-700 border-2 border-dark-600',
              'rounded-xl text-white placeholder-dark-500',
              'outline-none transition-colors',
              'focus:border-white/20',
              isMobile ? 'px-4 py-3 text-base' : 'px-5 py-4 text-lg'
            )}
            maxLength={20}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-rim-500/20 border border-rim-500/40 rounded-xl">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Start button */}
        <Button
          onClick={startGame}
          size="lg"
          disabled={isLoading}
          className="w-full mb-8"
        >
          {isLoading ? 'Chargement...' : 'Step on the court 🔥'}
        </Button>
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div>
          <h3
            className={cn(
              'font-bold text-white mb-4',
              isMobile ? 'text-lg' : 'text-xl'
            )}
          >
            🏆 Hall of Fame
          </h3>
          <Leaderboard entries={leaderboard} limit={5} />
        </div>
      )}
    </Card>
  );
}
