/**
 * Universe Type Definitions
 * Core interfaces for the multi-universe platform
 */

// Character type configuration per universe
export interface CharacterTypeConfig {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
  glow: string;
}

// Achievement labels (1-5 levels)
export type AchievementLabels = Record<1 | 2 | 3 | 4 | 5, string>;

// Menu screen wording
export interface MenuWording {
  playerNameLabel: string;
  playerNamePlaceholder: string;
  startButton: string;
  loadingButton: string;
  hallOfFameTitle: string;
  hallOfFameSubtitle: string;
}

// Playing screen wording
export interface PlayingWording {
  round: string;
  streak: string;
  score: string;
  level: string;
  attempts: string;
  quitButton: string;
  guessPlaceholder: string;
}

// Won screen wording
export interface WonWording {
  title: string;
  answerPrefix: string;
  scoreLabel: string;
  streakLabel: string;
  nextRoundButton: string;
  menuButton: string;
}

// Game over screen wording
export interface GameOverWording {
  timeoutTitle: string;
  gameOverTitle: string;
  hallOfFameTitle: string;
  answerPrefix: string;
  finalScoreLabel: string;
  roundsLabel: string;
  maxStreakLabel: string;
  shareButton: string;
  shareButtonGoat: string;
  playAgainButton: string;
  menuButton: string;
  allLevelsCleared: string;
  levelLabel: string;
}

// Share card wording
export interface ShareWording {
  title: string;
  myStatsTitle: string;
  hallOfFameTitle: string;
  shareTitle: string;
  shareButton: string;
  copyImageButton: string;
  copyTextButton: string;
  copiedMessage: string;
  closeButton: string;
  imageDownloadedMessage: string;
  scoreLabel: string;
  streakLabel: string;
  roundsLabel: string;
  levelLabel: string;
}

// Encouraging messages with {percentile} placeholder
export interface EncouragingMessagesWording {
  allCleared: string;
  noPercentile: string;
  top90: string;
  top75: string;
  top50: string;
  top25: string;
  default: string;
}

// Share text templates with placeholders: {playerName}, {totalScore}, {maxStreak}, {round}, {level}
export interface ShareTextWording {
  allCleared: string;
  default: string;
}

// Error messages
export interface ErrorsWording {
  connectionError: string;
  imageGenerationError: string;
  imageCopyError: string;
}

// Footer wording
export interface FooterWording {
  shareOnX: string;
  contact: string;
  createdWith: string;
  by: string;
  allRightsReserved: string;
}

// All translatable strings for a universe
export interface UniverseWording {
  appTitle: string;
  tagline: string;
  loading: string;
  menu: MenuWording;
  playing: PlayingWording;
  won: WonWording;
  gameOver: GameOverWording;
  share: ShareWording;
  encouragingMessages: EncouragingMessagesWording;
  shareText: ShareTextWording;
  errors: ErrorsWording;
  footer: FooterWording;
}

// Optional color overrides
export interface ColorOverrides {
  primary: string;
  secondary: string;
  accent: string;
}

// Full universe configuration
export interface UniverseConfig {
  id: string;
  name: string;
  slug: string;
  characterTypes: Record<string, CharacterTypeConfig>;
  achievementLabels: AchievementLabels;
  wording: UniverseWording;
  colors?: Partial<ColorOverrides>;
}
