/**
 * One Piece Universe Configuration
 * Complete French wording for the One Piece themed quiz game
 */

import { UniverseConfig } from '../types';

export const onePieceUniverse: UniverseConfig = {
  id: 'one-piece',
  name: 'ONE PIECE',
  slug: 'one-piece',

  characterTypes: {
    pirate: {
      id: 'pirate',
      label: 'PIRATE',
      emoji: '🏴‍☠️',
      gradient:
        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      glow: 'rgba(15, 52, 96, 0.4)',
    },
    marine: {
      id: 'marine',
      label: 'MARINE',
      emoji: '⚓',
      gradient:
        'linear-gradient(135deg, #1e3a5f 0%, #2e5d8b 50%, #3d7ab8 100%)',
      glow: 'rgba(61, 122, 184, 0.4)',
    },
    revolutionary: {
      id: 'revolutionary',
      label: 'RÉVOLUTIONNAIRE',
      emoji: '✊',
      gradient:
        'linear-gradient(135deg, #4a1942 0%, #6b2d5b 50%, #8c3d74 100%)',
      glow: 'rgba(140, 61, 116, 0.4)',
    },
    shichibukai: {
      id: 'shichibukai',
      label: 'SHICHIBUKAI',
      emoji: '🗡️',
      gradient:
        'linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 50%, #666666 100%)',
      glow: 'rgba(102, 102, 102, 0.4)',
    },
    yonko: {
      id: 'yonko',
      label: 'YONKO',
      emoji: '👑',
      gradient:
        'linear-gradient(135deg, #8b6914 0%, #c9a227 50%, #f4d03f 100%)',
      glow: 'rgba(244, 208, 63, 0.4)',
    },
    civilian: {
      id: 'civilian',
      label: 'CIVIL',
      emoji: '🏠',
      gradient:
        'linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #67a830 100%)',
      glow: 'rgba(103, 168, 48, 0.4)',
    },
  },

  achievementLabels: {
    1: 'MOUSSE',
    2: 'MATELOT',
    3: 'CAPITAINE',
    4: 'SUPERNOVA',
    5: 'ROI DES PIRATES',
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
