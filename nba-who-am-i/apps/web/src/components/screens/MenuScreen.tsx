import { LeaderboardEntry } from '@/api/game';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Leaderboard } from '@/components/ui/Leaderboard';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

export interface MenuScreenProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  leaderboard: LeaderboardEntry[];
  error: string | null;
  isLoading: boolean;
  isLeaderboardLoading: boolean;
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
  isLeaderboardLoading,
}: MenuScreenProps) {
  const isMobile = useIsMobile();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      startGame();
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Game Card */}
      <Card className={isMobile ? 'p-6' : 'p-8'}>
        {/* Player name input and start button - centered with max width */}
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label
              htmlFor="playerName"
              className={cn(
                'block text-dark-400 mb-2',
                isMobile ? 'text-sm' : 'text-base'
              )}
            >
              Qui es-tu, rookie ?
            </label>
            <input
              id="playerName"
              type="text"
              placeholder="Un rookie anonyme"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={handleKeyDown}
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
            className="w-full"
          >
            {isLoading ? 'Chargement...' : "C'est parti ! 🔥"}
          </Button>
        </div>
      </Card>

      {/* Leaderboard Card */}
      {leaderboard.length > 0 && (
        <Card className={isMobile ? 'p-6' : 'p-8'}>
          <div className="mb-6">
            <h3
              className={cn(
                'font-black text-white text-center mb-2',
                isMobile ? 'text-xl' : 'text-2xl'
              )}
            >
              🏆 Hall of Fame
            </h3>
            <p
              className={cn(
                'text-center text-dark-400',
                isMobile ? 'text-xs' : 'text-sm'
              )}
            >
              Top 10 des meilleurs joueurs
            </p>
          </div>
          <Leaderboard
            entries={leaderboard}
            limit={10}
            isLoading={isLeaderboardLoading}
          />
        </Card>
      )}
    </div>
  );
}
