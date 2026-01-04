/**
 * One Piece Universe Configuration
 * Complete French wording for the One Piece themed quiz game
 *
 * Color Theme:
 * - Primary: Luffy Red (#E63946) - vibrant, energetic
 * - Secondary: Treasure Gold (#FFB700) - adventure reward
 * - Accent: Ocean Cyan (#00B4D8) - Grand Line waters
 * - Dark: Deep Navy (#0A1628) - deep ocean at night
 */

import { UniverseConfig } from '../types';

// One Piece specific gradients
export const ONE_PIECE_GRADIENTS = {
  // Luffy's determination - red to gold fire
  fire: 'linear-gradient(135deg, #E63946 0%, #FF6B6B 50%, #FFB700 100%)',
  // Grand Line ocean - tropical sea
  ocean: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #48CAE4 100%)',
  // Treasure/victory - rich gold
  gold: 'linear-gradient(135deg, #FFB700 0%, #FFC300 50%, #FFD60A 100%)',
  // Night sea/mystery - dangerous waters
  night: 'linear-gradient(135deg, #0A1628 0%, #1A1A2E 50%, #16213E 100%)',
  // New World battles - epic green
  green: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 50%, #52B788 100%)',
  // Straw Hat sunset - Thousand Sunny vibes
  sunset: 'linear-gradient(135deg, #FF6B6B 0%, #FFB700 50%, #FFC300 100%)',
  // Revolutionary army - dramatic purple
  revolutionary:
    'linear-gradient(135deg, #7B2D8E 0%, #9D4EDD 50%, #C77DFF 100%)',
} as const;

// One Piece specific glows
export const ONE_PIECE_GLOWS = {
  fire: 'rgba(230, 57, 70, 0.5)',
  ocean: 'rgba(0, 180, 216, 0.5)',
  gold: 'rgba(255, 183, 0, 0.5)',
  night: 'rgba(26, 26, 46, 0.5)',
  green: 'rgba(82, 183, 136, 0.5)',
  sunset: 'rgba(255, 107, 107, 0.5)',
  revolutionary: 'rgba(157, 78, 221, 0.5)',
} as const;

export const onePieceUniverse: UniverseConfig = {
  id: 'one-piece',
  name: 'ONE PIECE',
  slug: 'one-piece',

  // Color overrides for One Piece theme
  colors: {
    primary: '#E63946', // Luffy Red
    secondary: '#FFB700', // Treasure Gold
    accent: '#00B4D8', // Ocean Cyan
  },

  characterTypes: {
    pirate: {
      id: 'pirate',
      label: 'PIRATE',
      emoji: '🏴‍☠️',
      gradient: ONE_PIECE_GRADIENTS.fire,
      glow: ONE_PIECE_GLOWS.fire,
    },
    marine: {
      id: 'marine',
      label: 'MARINE',
      emoji: '⚓',
      gradient: ONE_PIECE_GRADIENTS.ocean,
      glow: ONE_PIECE_GLOWS.ocean,
    },
    revolutionary: {
      id: 'revolutionary',
      label: 'RÉVOLUTIONNAIRE',
      emoji: '✊',
      gradient: ONE_PIECE_GRADIENTS.revolutionary,
      glow: ONE_PIECE_GLOWS.revolutionary,
    },
    shichibukai: {
      id: 'shichibukai',
      label: 'SHICHIBUKAI',
      emoji: '🗡️',
      gradient: ONE_PIECE_GRADIENTS.night,
      glow: ONE_PIECE_GLOWS.night,
    },
    yonko: {
      id: 'yonko',
      label: 'YONKO',
      emoji: '👑',
      gradient: ONE_PIECE_GRADIENTS.gold,
      glow: ONE_PIECE_GLOWS.gold,
    },
    civilian: {
      id: 'civilian',
      label: 'CIVIL',
      emoji: '🏠',
      gradient: ONE_PIECE_GRADIENTS.green,
      glow: ONE_PIECE_GLOWS.green,
    },
  },

  achievementLabels: {
    1: 'MOUSSE',
    2: 'MATELOT',
    3: 'CAPITAINE',
    4: 'SUPERNOVA',
    5: 'ROI DES PIRATES',
  },

  // One Piece achievement gradients - adventure progression through the seas
  achievementGradients: {
    1: {
      // East Blue (starter) - calm waters, beginning of journey
      gradient: 'linear-gradient(135deg, #0A1628 0%, #16213E 100%)',
      glow: 'rgba(22, 33, 62, 0.6)',
      locked: 'linear-gradient(135deg, #1A1A2E 0%, #0A1628 100%)',
    },
    2: {
      // Grand Line (intermediate) - ocean adventure
      gradient: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      glow: 'rgba(0, 180, 216, 0.6)',
      locked: 'linear-gradient(135deg, #1A1A2E 0%, #0A1628 100%)',
    },
    3: {
      // New World (advanced) - fire/battle intensity
      gradient: 'linear-gradient(135deg, #E63946 0%, #FF6B6B 100%)',
      glow: 'rgba(230, 57, 70, 0.6)',
      locked: 'linear-gradient(135deg, #1A1A2E 0%, #0A1628 100%)',
    },
    4: {
      // Yonko level (expert) - treasure gold
      gradient: 'linear-gradient(135deg, #FFB700 0%, #FFC300 100%)',
      glow: 'rgba(255, 183, 0, 0.6)',
      locked: 'linear-gradient(135deg, #1A1A2E 0%, #0A1628 100%)',
    },
    5: {
      // Pirate King (GOAT) - red to gold glory, ultimate achievement
      gradient: 'linear-gradient(135deg, #E63946 0%, #FFB700 100%)',
      glow: 'rgba(255, 183, 0, 0.8)',
      locked: 'linear-gradient(135deg, #1A1A2E 0%, #0A1628 100%)',
    },
  },

  wording: {
    appTitle: 'ONE PIECE WHO AM I ?',
    tagline: "Trouve le personnage avant que le Log Pose ne s'affole !",
    loading: 'Chargement du Grand Line...',

    menu: {
      playerNameLabel: 'Quel pirate es-tu ?',
      playerNamePlaceholder: 'Un rookie anonyme',
      startButton: 'METTRE LES VOILES',
      loadingButton: 'Préparation du navire...',
      hallOfFameTitle: 'HALL OF FAME DU GRAND LINE',
      hallOfFameSubtitle: 'Les plus grands explorateurs',
    },

    playing: {
      round: 'ÎLE',
      streak: 'SÉRIE',
      score: 'SCORE',
      level: 'NIVEAU',
      attempts: 'ESSAIS',
      quitButton: 'RETOURNER À EAST BLUE',
      guessPlaceholder: 'Qui est ce personnage ?',
    },

    won: {
      title: 'YOHOHOHO ! VICTOIRE !',
      answerPrefix: "C'était bien",
      scoreLabel: 'Score',
      streakLabel: 'Série',
      nextRoundButton: 'PROCHAINE ÎLE',
      menuButton: 'GRAND LINE',
    },

    gameOver: {
      timeoutTitle: 'BUSTER CALL !',
      gameOverTitle: "C'EST FINI, MOUSSAILLON !",
      hallOfFameTitle: 'HALL OF FAME DU GRAND LINE',
      answerPrefix: "C'était",
      finalScoreLabel: 'Score Final',
      roundsLabel: 'Îles Explorées',
      maxStreakLabel: 'Meilleure Série',
      shareButton: 'PARTAGER TON VOYAGE',
      shareButtonGoat: 'PROCLAMER TA VICTOIRE',
      playAgainButton: 'REPRENDRE LA MER',
      menuButton: 'GRAND LINE',
      allLevelsCleared: 'TOUS LES OCÉANS CONQUIS',
      levelLabel: 'Niveau',
    },

    share: {
      title: 'Partager ton voyage',
      myStatsTitle: 'MON VOYAGE',
      hallOfFameTitle: 'HALL OF FAME DU GRAND LINE',
      shareTitle: 'Partager',
      shareButton: 'Partager',
      copyImageButton: "Copier l'avis de recherche",
      copyTextButton: 'Copier le texte',
      copiedMessage: 'Copié dans le presse-papier !',
      closeButton: 'Fermer',
      imageDownloadedMessage: 'Avis de recherche téléchargé !',
      scoreLabel: 'Score',
      streakLabel: 'Série',
      roundsLabel: 'Îles',
      levelLabel: 'Niveau',
    },

    encouragingMessages: {
      allCleared:
        'TU ES LE ROI DES PIRATES ! Tu as conquis tous les océans du Grand Line. La One Piece est à toi !',
      noPercentile:
        'Continue ton voyage, {playerName} ! Chaque grand pirate a commencé comme mousse !',
      top90:
        'Excellent voyage, {playerName} ! Tu fais partie du top {percentile}% des explorateurs du Grand Line !',
      top75:
        'Beau parcours, {playerName} ! Tu surpasses {percentile}% des aventuriers du Grand Line !',
      top50:
        "Pas mal du tout, {playerName} ! Tu dépasses {percentile}% des pirates. Le Nouveau Monde t'attend !",
      top25:
        'Continue ton entraînement, {playerName}. Avec de la persévérance, tu deviendras un grand pirate !',
      default:
        'Le Grand Line est impitoyable, {playerName}. Mais chaque grand pirate a commencé comme mousse !',
    },

    shareText: {
      allCleared:
        "Je suis devenu le Roi des Pirates ! J'ai conquis les {rounds} océans du Grand Line sur ONE PIECE WHO AM I ? Score: {score} | Niveau: {level}",
      default:
        "J'ai exploré {rounds} îles du Grand Line sur ONE PIECE WHO AM I ? Score: {score} | Meilleure série: {streak}",
    },

    errors: {
      connectionError: 'Erreur de connexion avec le Den Den Mushi...',
      imageGenerationError: "Impossible de créer l'avis de recherche...",
      imageCopyError: "Impossible de copier l'avis de recherche...",
    },

    footer: {
      shareOnX: 'Partager sur X',
      contact: 'Contact',
      createdWith: 'Créé avec',
      by: 'par',
      allRightsReserved: 'Tous droits réservés',
    },
  },
};
