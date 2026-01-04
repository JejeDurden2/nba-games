import { UniverseConfig } from '../types';
import { DEFAULT_GRADIENTS, DEFAULT_GLOWS } from '../defaults';

/**
 * NBA Universe Configuration
 * The default universe for the "Who Am I?" game
 */
export const nbaUniverse: UniverseConfig = {
  id: 'nba',
  name: 'NBA',
  slug: 'nba',

  // Color theme for NBA - neon basketball aesthetic
  colors: {
    primary: '#FF1744', // Ball red - neon basketball
    secondary: '#FFD600', // Accent yellow - championship gold
    accent: '#00E5FF', // Accent cyan - arena lights
    gradients: {
      primary: 'linear-gradient(135deg, #FF3864 0%, #FF0054 50%, #D6004C 100%)',
      glow: 'rgba(255, 56, 100, 0.4)',
    },
  },

  // Character types specific to NBA
  characterTypes: {
    player: {
      id: 'player',
      label: 'PLAYER',
      emoji: '🏀',
      gradient: DEFAULT_GRADIENTS.fire,
      glow: DEFAULT_GLOWS.fire,
    },
    coach: {
      id: 'coach',
      label: 'COACH',
      emoji: '📋',
      gradient: DEFAULT_GRADIENTS.ocean,
      glow: DEFAULT_GLOWS.ocean,
    },
    legend: {
      id: 'legend',
      label: 'LEGEND',
      emoji: '👑',
      gradient: DEFAULT_GRADIENTS.gold,
      glow: DEFAULT_GLOWS.gold,
    },
    executive: {
      id: 'executive',
      label: 'EXEC',
      emoji: '👔',
      gradient: DEFAULT_GRADIENTS.purple,
      glow: DEFAULT_GLOWS.purple,
    },
  },

  // Achievement labels (NBA themed)
  achievementLabels: {
    1: 'ROOKIE',
    2: 'STARTER',
    3: 'ALL-STAR',
    4: 'MVP',
    5: 'GOAT',
  },

  // All French wording for NBA universe
  wording: {
    appTitle: 'NBA WHO AM I ?',
    tagline: 'Teste ton QI basket !',
    loading: 'Chargement...',

    menu: {
      playerNameLabel: 'Qui es-tu, rookie ?',
      playerNamePlaceholder: 'Un rookie anonyme',
      startButton: "C'est parti ! 🔥",
      loadingButton: 'Chargement...',
      hallOfFameTitle: '🏆 Hall of Fame',
      hallOfFameSubtitle: 'Top 10 des meilleurs joueurs',
    },

    playing: {
      round: 'Round',
      streak: 'Gamebreaker',
      score: 'Score',
      level: 'Niveau',
      attempts: 'Essais',
      quitButton: '✕ Back to Papa',
      guessPlaceholder: 'Une idée ?',
    },

    won: {
      title: 'BANG ! BUCKETS ! 💰',
      answerPrefix: "Yessir, c'était",
      scoreLabel: 'SCORE',
      streakLabel: 'GAMEBREAKER',
      nextRoundButton: 'Prochain round →',
      menuButton: '🏠 Retour au menu',
    },

    gameOver: {
      timeoutTitle: 'SHOT CLOCK VIOLATION ⏰',
      gameOverTitle: 'GAME OVER',
      hallOfFameTitle: 'HALL OF FAME ! 👑',
      answerPrefix: "C'était :",
      finalScoreLabel: 'SCORE FINAL',
      roundsLabel: 'ROUNDS',
      maxStreakLabel: 'MAX GAMEBREAKER',
      shareButton: '📤 Partage ton score',
      shareButtonGoat: '🎮 GOAT ! Partage ton score !',
      playAgainButton: '🔁 Run it back !',
      menuButton: '🏠 Retour au menu',
      allLevelsCleared: '⭐ TOUS LES NIVEAUX CONQUIS ⭐',
      levelLabel: 'NIVEAU',
    },

    share: {
      title: 'PARTAGE TON SCORE ! 📤',
      myStatsTitle: 'MY STATS',
      hallOfFameTitle: 'HALL OF FAME ! 👑',
      shareTitle: 'PARTAGE TON SCORE ! 📤',
      shareButton: '📤 Partager mes résultats',
      copyImageButton: '🖼️ Copier image',
      copyTextButton: '📋 Copier texte',
      copiedMessage: '✓ Copié !',
      closeButton: 'Fermer',
      imageDownloadedMessage:
        '📥 Image téléchargée ! Tu peux maintenant la partager.',
      scoreLabel: 'SCORE',
      streakLabel: 'GAMEBREAKER',
      roundsLabel: 'ROUNDS',
      levelLabel: 'NIVEAU',
    },

    encouragingMessages: {
      allCleared:
        '🎮 GAMEBREAKER UNLOCKED ! Tu les as tous mis au poste ! GOAT STATUS ! 🏆',
      noPercentile: 'Pas mal rookie... Faut bosser ta vision de jeu ! 💪',
      top90:
        '🔥 BANG ! BANG ! OH WHAT A SHOT ! Tu as explosé {percentile}% des joueurs ! 🥶',
      top75:
        "⭐ WITH NO REGARD FOR HUMAN LIFE ! Tu as crossé {percentile}% des joueurs ! THAT'S GAME ! 🍳",
      top50:
        '👊 GOT THE SKILLS TO PAY THE BILLS ! Tu as battu {percentile}% des joueurs ! Respect ! 💯',
      top25:
        '💪 Tu as fait mieux que {percentile}% des joueurs ! ARE YOU KIDDING ME ?! Continue ! 📈',
      default:
        '🏀 Pas mal rookie (top {percentile}%)... Reviens plus fort ! 🎯',
    },

    shareText: {
      allCleared: `*{playerName}* vient de DOMINER NBA Who Am I ! 🏆

✅ Les 5 niveaux terminés
🔥 {maxStreak} gamebreaker max
⭐ {totalScore} points
🎯 {round} rounds

Tu penses pouvoir faire mieux ? 💪`,
      default: `Je viens de scorer *{totalScore} points* sur NBA Who Am I ! 🏀

👤 {playerName}
🔥 {maxStreak} gamebreaker
🎯 Round {round}
⭐ Niveau {level}/5

Tu penses avoir le niveau ? 💪`,
    },

    errors: {
      connectionError:
        'Impossible de démarrer la partie. Vérifiez votre connexion.',
      imageGenerationError: "Erreur lors de la génération de l'image.",
      imageCopyError: "Erreur lors de la copie de l'image.",
    },

    footer: {
      shareOnX: '🐦 Partager sur X',
      contact: '✉️ Contact',
      createdWith: 'Créé avec',
      by: 'par',
      allRightsReserved: 'Tous droits réservés.',
    },
  },
};
