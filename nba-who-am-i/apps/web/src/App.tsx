import { useRef, useEffect, useState } from 'react';
import { useGame } from './hooks/useGame';
import { CharacterType, LeaderboardEntry } from './api/game';

// Responsive breakpoints
const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

const tokens = {
  colors: {
    ball: { 400: '#FF6B35', 500: '#E86A33', 600: '#C94D1C' },
    rim: { 500: '#DC2626', 600: '#B91C1C' },
    nba: { blue: '#1D428A', red: '#C8102E' },
    dark: {
      900: '#09090B',
      800: '#18181B',
      700: '#27272A',
      600: '#3F3F46',
      500: '#52525B',
    },
    accent: { green: '#10B981', yellow: '#FBBF24', cyan: '#06B6D4' },
  },
  gradients: {
    fire: 'linear-gradient(135deg, #FF6B35 0%, #DC2626 50%, #991B1B 100%)',
    ocean: 'linear-gradient(135deg, #1D428A 0%, #0EA5E9 100%)',
    gold: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  },
};

const TYPE_CONFIG: Record<
  CharacterType,
  { gradient: string; glow: string; label: string; emoji: string }
> = {
  player: {
    gradient: tokens.gradients.fire,
    glow: 'rgba(255,107,53,0.4)',
    label: 'PLAYER',
    emoji: '🏀',
  },
  coach: {
    gradient: tokens.gradients.ocean,
    glow: 'rgba(29,66,138,0.4)',
    label: 'COACH',
    emoji: '📋',
  },
  legend: {
    gradient: tokens.gradients.gold,
    glow: 'rgba(251,191,36,0.4)',
    label: 'LEGEND',
    emoji: '👑',
  },
  executive: {
    gradient: tokens.gradients.purple,
    glow: 'rgba(139,92,246,0.4)',
    label: 'EXEC',
    emoji: '👔',
  },
};

// ==================== COMPONENTS ====================

function GlowButton({
  children,
  gradient,
  glow,
  onClick,
  size = 'md',
  disabled = false,
}: {
  children: React.ReactNode;
  gradient?: string;
  glow?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}) {
  const sizes = { sm: '10px 16px', md: '16px 32px', lg: '20px 48px' };
  const fonts = { sm: '13px', md: '16px', lg: '20px' };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: sizes[size],
        background: gradient || tokens.gradients.fire,
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontSize: fonts[size],
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: `0 0 30px ${glow || 'rgba(255,107,53,0.3)'}`,
        transition: 'all 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

function GlassCard({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgba(24,24,27,0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(63,63,70,0.5)',
        borderRadius: '20px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function LeaderboardInline({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: tokens.colors.dark[500],
          padding: '20px',
        }}
      >
        Aucun score pour l&apos;instant. Sois le premier !
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {entries.slice(0, 5).map((entry, i) => (
        <div
          key={entry.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: i === 0 ? 'rgba(251,191,36,0.1)' : 'rgba(39,39,42,0.5)',
            border:
              i === 0
                ? '1px solid rgba(251,191,36,0.3)'
                : '1px solid transparent',
            borderRadius: '10px',
          }}
        >
          <span style={{ fontSize: '20px', width: '28px' }}>
            {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: '14px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {entry.playerName}
            </div>
            <div style={{ fontSize: '11px', color: tokens.colors.dark[500] }}>
              {entry.maxStreak} max 🔥
            </div>
          </div>
          <div
            style={{
              fontWeight: 900,
              fontSize: '16px',
              fontFamily: 'monospace',
              background: tokens.gradients.ocean,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {entry.score.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function MenuScreen({
  playerName,
  setPlayerName,
  startGame,
  leaderboard,
  error,
  isLoading,
}: {
  playerName: string;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  leaderboard: LeaderboardEntry[];
  error: string | null;
  isLoading: boolean;
}) {
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`);
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
        gap: isDesktop ? '24px' : '20px',
      }}
    >
      <GlassCard
        style={{
          padding: isMobile ? '32px 20px' : '40px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: isMobile ? '48px' : '64px',
            marginBottom: '12px',
          }}
        >
          🏀
        </div>
        <h2
          style={{
            fontSize: isMobile ? '1.2rem' : '1.4rem',
            fontWeight: 700,
            marginBottom: '8px',
            margin: '0 0 8px 0',
          }}
        >
          Devine la personnalité NBA!
        </h2>
        <p
          style={{
            color: tokens.colors.dark[500],
            marginBottom: '24px',
            lineHeight: 1.5,
            fontSize: isMobile ? '13px' : '14px',
          }}
        >
          Des indices apparaissent progressivement pendant 30 secondes.
          <br />
          Plus tu es rapide, plus tu scores !
        </p>

        {error && (
          <div
            style={{
              background: 'rgba(220,38,38,0.2)',
              border: '1px solid rgba(220,38,38,0.5)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#FCA5A5',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Entre ton pseudo..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
          style={{
            width: '100%',
            maxWidth: '260px',
            padding: '14px 18px',
            background: tokens.colors.dark[800],
            border: `2px solid ${tokens.colors.dark[600]}`,
            borderRadius: '12px',
            color: 'white',
            fontSize: '15px',
            textAlign: 'center',
            marginBottom: '32px',
            outline: 'none',
          }}
        />

        <GlowButton onClick={startGame} size="lg" disabled={isLoading}>
          {isLoading ? '⏳ Chargement...' : '🎮 JOUER'}
        </GlowButton>
      </GlassCard>

      <GlassCard style={{ padding: isMobile ? '20px' : '24px' }}>
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          🏆 Leaderboard
        </h3>
        <LeaderboardInline entries={leaderboard} />
      </GlassCard>
    </div>
  );
}

function PlayingScreen({
  displayedText,
  timeLeft,
  config,
  calculatePotentialScore,
  guess,
  setGuess,
  submitGuess,
  wrongGuess,
  inputRef,
  onQuit,
  round,
  streak,
  totalScore,
}: {
  displayedText: string;
  timeLeft: number;
  config: typeof TYPE_CONFIG.player;
  calculatePotentialScore: (time: number) => number;
  guess: string;
  setGuess: (guess: string) => void;
  submitGuess: () => void;
  wrongGuess: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onQuit: () => void;
  round: number;
  streak: number;
  totalScore: number;
}) {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
  const timerColor =
    timeLeft > 20
      ? tokens.colors.accent.green
      : timeLeft > 10
        ? tokens.colors.accent.yellow
        : tokens.colors.rim[500];
  const progressPercent = (timeLeft / 30) * 100;

  return (
    <div>
      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          padding: isMobile ? '10px 12px' : '12px 16px',
          background: 'rgba(24,24,27,0.6)',
          borderRadius: '12px',
          fontSize: isMobile ? '12px' : '13px',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? '12px' : '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '12px' : '20px',
            flexWrap: 'wrap',
          }}
        >
          <span>
            Round <b style={{ color: 'white' }}>{round}</b>
          </span>
          <span>
            Streak <b style={{ color: tokens.colors.ball[400] }}>{streak}🔥</b>
          </span>
          <span>
            Score{' '}
            <b style={{ color: tokens.colors.accent.cyan }}>{totalScore}</b>
          </span>
        </div>
        <button
          onClick={onQuit}
          style={{
            padding: isMobile ? '5px 10px' : '6px 12px',
            background: 'rgba(220,38,38,0.2)',
            border: '1px solid rgba(220,38,38,0.4)',
            borderRadius: '6px',
            color: '#FCA5A5',
            fontSize: isMobile ? '11px' : '12px',
            cursor: 'pointer',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          ✕ Quitter
        </button>
      </div>

      {/* Type badge & Timer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: isMobile ? '12px' : '0',
        }}
      >
        <div
          style={{
            padding: isMobile ? '6px 16px' : '8px 20px',
            background: config.gradient,
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: isMobile ? '11px' : '13px',
            letterSpacing: isMobile ? '1.5px' : '2px',
            boxShadow: `0 0 20px ${config.glow}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{config.emoji}</span>
          <span>{config.label}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: 900,
              fontFamily: 'monospace',
              color: timerColor,
              lineHeight: 1,
              textShadow: `0 0 30px ${timerColor}`,
              animation:
                timeLeft <= 10 ? 'pulse 0.5s ease-in-out infinite' : 'none',
            }}
          >
            {timeLeft}
          </div>
          <div
            style={{
              fontSize: isMobile ? '12px' : '14px',
              color: tokens.colors.dark[500],
            }}
          >
            +{calculatePotentialScore(timeLeft)} pts
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '6px',
          background: tokens.colors.dark[800],
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: config.gradient,
            transition: 'width 1s linear',
          }}
        />
      </div>

      {/* Hints text */}
      <GlassCard
        style={{
          padding: isMobile ? '20px' : '28px',
          minHeight: isMobile ? '200px' : '300px',
          marginBottom: '20px',
          boxShadow: `0 0 40px ${config.glow}`,
        }}
      >
        <p
          style={{
            margin: 0,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            color: '#E4E4E7',
            fontSize: '15px',
          }}
        >
          {displayedText}
          <span
            style={{
              color: tokens.colors.ball[400],
              animation: 'blink 1s step-end infinite',
            }}
          >
            |
          </span>
        </p>
      </GlassCard>

      {/* Input */}
      <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Ta réponse..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitGuess()}
          style={{
            flex: 1,
            padding: isMobile ? '14px 16px' : '18px 24px',
            background: tokens.colors.dark[800],
            border: `2px solid ${wrongGuess ? tokens.colors.rim[500] : tokens.colors.dark[600]}`,
            borderRadius: '14px',
            color: 'white',
            fontSize: isMobile ? '16px' : '18px',
            outline: 'none',
            transition: 'all 0.2s',
            animation: wrongGuess ? 'shake 0.4s ease' : 'none',
          }}
        />
        <GlowButton
          onClick={submitGuess}
          gradient={config.gradient}
          glow={config.glow}
          size={isMobile ? 'md' : 'lg'}
        >
          <span style={{ fontSize: isMobile ? '20px' : '24px' }}>→</span>
        </GlowButton>
      </div>
    </div>
  );
}

function WonScreen({
  answerName,
  score,
  streak,
  startGame,
  resetToMenu,
}: {
  answerName: string;
  score: number;
  streak: number;
  startGame: () => void;
  resetToMenu: () => void;
}) {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);

  return (
    <GlassCard
      style={{
        padding: isMobile ? '32px 20px' : '48px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{ fontSize: isMobile ? '56px' : '72px', marginBottom: '8px' }}
      >
        🎉
      </div>
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 900,
          background: tokens.gradients.green,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 8px 0',
        }}
      >
        CORRECT!
      </h2>
      <p
        style={{
          fontSize: isMobile ? '1.1rem' : '1.25rem',
          margin: '0 0 20px 0',
          color: 'white',
        }}
      >
        {answerName}
      </p>
      <div
        style={{
          fontSize: isMobile ? '42px' : '56px',
          fontWeight: 900,
          background: tokens.gradients.ocean,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}
      >
        +{score}
      </div>
      {streak > 1 && (
        <div
          style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(255,107,53,0.15)',
            border: '1px solid rgba(255,107,53,0.3)',
            borderRadius: '30px',
            color: tokens.colors.ball[400],
            fontWeight: 700,
            marginBottom: '24px',
          }}
        >
          🔥 STREAK x{streak} (+{Math.round((streak - 1) * 15)}% bonus)
        </div>
      )}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}
      >
        <GlowButton
          onClick={startGame}
          size="md"
          gradient={tokens.gradients.green}
          glow="rgba(16,185,129,0.4)"
        >
          SUIVANT →
        </GlowButton>
        <button
          onClick={resetToMenu}
          style={{
            padding: '16px 24px',
            background: tokens.colors.dark[800],
            border: `1px solid ${tokens.colors.dark[600]}`,
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          🏠 Menu
        </button>
      </div>
    </GlassCard>
  );
}

function GameOverScreen({
  answerName,
  totalScore,
  round,
  maxStreak,
  isTimeout,
  startGame,
  resetToMenu,
}: {
  answerName: string;
  totalScore: number;
  round: number;
  maxStreak: number;
  isTimeout: boolean;
  startGame: () => void;
  resetToMenu: () => void;
}) {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);

  return (
    <GlassCard
      style={{
        padding: isMobile ? '32px 20px' : '48px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{ fontSize: isMobile ? '56px' : '72px', marginBottom: '8px' }}
      >
        {isTimeout ? '⏱️' : '🏁'}
      </div>
      <h2
        style={{
          fontSize: isMobile ? '1.4rem' : '1.75rem',
          fontWeight: 900,
          color: tokens.colors.rim[500],
          margin: '0 0 8px 0',
        }}
      >
        {isTimeout ? 'TEMPS ÉCOULÉ' : 'PARTIE TERMINÉE'}
      </h2>

      {answerName && (
        <>
          <p
            style={{
              color: tokens.colors.dark[500],
              margin: '0 0 4px 0',
              fontSize: isMobile ? '13px' : '14px',
            }}
          >
            La réponse était:
          </p>
          <p
            style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              fontWeight: 700,
              margin: '0 0 24px 0',
            }}
          >
            {answerName}
          </p>
        </>
      )}

      {/* Final stats */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          gap: isMobile ? '16px' : '32px',
          marginBottom: '32px',
          padding: isMobile ? '16px' : '20px',
          background: 'rgba(39,39,42,0.5)',
          borderRadius: '12px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '12px',
              color: tokens.colors.dark[500],
              marginBottom: '4px',
            }}
          >
            SCORE FINAL
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: tokens.colors.accent.cyan,
            }}
          >
            {totalScore}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '12px',
              color: tokens.colors.dark[500],
              marginBottom: '4px',
            }}
          >
            ROUNDS
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>
            {round}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '12px',
              color: tokens.colors.dark[500],
              marginBottom: '4px',
            }}
          >
            MAX STREAK
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: tokens.colors.ball[400],
            }}
          >
            {maxStreak}🔥
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <GlowButton onClick={startGame}>🔄 REJOUER</GlowButton>
        <button
          onClick={resetToMenu}
          style={{
            padding: '16px 24px',
            background: tokens.colors.dark[800],
            border: `1px solid ${tokens.colors.dark[600]}`,
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🏠 Menu principal
        </button>
      </div>
    </GlassCard>
  );
}

// ==================== MAIN APP ====================

export default function App() {
  const {
    gameState,
    character,
    displayedText,
    timeLeft,
    score,
    totalScore,
    streak,
    maxStreak,
    round,
    guess,
    wrongGuess,
    playerName,
    leaderboard,
    answerName,
    error,
    isGameOver,
    setGuess,
    setPlayerName,
    startGame,
    submitGuess,
    resetToMenu,
    stopGame,
    calculatePotentialScore,
  } = useGame();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === 'playing') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  const config = character ? TYPE_CONFIG[character.type] : TYPE_CONFIG.player;
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);

  return (
    <div
      style={{
        background: tokens.colors.dark[900],
        minHeight: '100vh',
        color: 'white',
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background effects */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(29,66,138,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          maxWidth: '680px',
          margin: '0 auto',
          padding: isMobile ? '12px' : '16px',
        }}
      >
        {/* Header */}
        <header
          style={{
            textAlign: 'center',
            padding: isMobile ? '16px 0' : '20px 0',
            marginBottom: '8px',
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? '1.75rem' : '2.2rem',
              fontWeight: 900,
              margin: 0,
              letterSpacing: '-1px',
              cursor: 'pointer',
            }}
            onClick={
              gameState === 'menu' || gameState === 'loading'
                ? undefined
                : resetToMenu
            }
          >
            <span
              style={{
                background: tokens.gradients.fire,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NBA
            </span>
            <span style={{ color: 'white' }}> WHO AM I</span>
            <span style={{ color: tokens.colors.ball[400] }}>?</span>
          </h1>
        </header>

        {/* Game States */}
        {(gameState === 'menu' || gameState === 'loading') && (
          <MenuScreen
            playerName={playerName}
            setPlayerName={setPlayerName}
            startGame={startGame}
            leaderboard={leaderboard}
            error={error}
            isLoading={gameState === 'loading'}
          />
        )}

        {gameState === 'playing' && character && (
          <PlayingScreen
            displayedText={displayedText}
            timeLeft={timeLeft}
            config={config}
            calculatePotentialScore={calculatePotentialScore}
            guess={guess}
            setGuess={setGuess}
            submitGuess={submitGuess}
            wrongGuess={wrongGuess}
            inputRef={inputRef as React.RefObject<HTMLInputElement>}
            onQuit={stopGame}
            round={round}
            streak={streak}
            totalScore={totalScore}
          />
        )}

        {gameState === 'won' && !isGameOver && (
          <WonScreen
            answerName={answerName}
            score={score}
            streak={streak}
            startGame={startGame}
            resetToMenu={resetToMenu}
          />
        )}

        {gameState === 'lost' && (
          <GameOverScreen
            answerName={answerName}
            totalScore={totalScore}
            round={round}
            maxStreak={maxStreak}
            isTimeout={timeLeft === 0}
            startGame={startGame}
            resetToMenu={resetToMenu}
          />
        )}
      </div>

      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-8px); } 40%, 80% { transform: translateX(8px); } }
        input::placeholder { color: #52525B; }
      `}</style>
    </div>
  );
}
