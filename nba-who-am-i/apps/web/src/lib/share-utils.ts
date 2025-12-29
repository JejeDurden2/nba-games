export interface ShareData {
  playerName: string;
  totalScore: number;
  maxStreak: number;
  round: number;
  difficulty: number;
  highestLevelCleared: number;
  allLevelsCleared: boolean;
}

/**
 * Generate share text based on game results
 */
export function generateShareText(data: ShareData): string {
  const {
    playerName,
    totalScore,
    maxStreak,
    round,
    highestLevelCleared,
    allLevelsCleared,
  } = data;

  if (allLevelsCleared) {
    return `🏆 ${playerName} a conquis NBA Who Am I! 🏆

💯 Tous les 5 niveaux terminés
🔥 Streak maximum: ${maxStreak}
⭐ Score: ${totalScore} points
🎯 ${round} rounds

Tu peux me battre? 🏀`;
  }

  return `🏀 NBA Who Am I

👤 ${playerName}
📊 Score: ${totalScore}
🔥 Streak: ${maxStreak}
🎯 Round ${round}
⭐ Niveau ${highestLevelCleared}/5

Joue maintenant! 🏆`;
}

/**
 * Get the game URL to share
 */
export function getGameUrl(): string {
  return window.location.origin;
}

/**
 * Share results using Web Share API with fallback
 */
export async function shareResults(data: ShareData): Promise<boolean> {
  const text = generateShareText(data);
  const url = getGameUrl();

  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'NBA Who Am I - Mes Résultats',
        text,
        url,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  }

  // Fallback: copy to clipboard
  return copyShareText(text + '\n\n' + url);
}

/**
 * Copy text to clipboard
 */
export async function copyShareText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);

    // Fallback: use deprecated execCommand
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError);
      return false;
    }
  }
}

/**
 * Share on Twitter/X
 */
export function shareOnTwitter(data: ShareData): void {
  const text = generateShareText(data);
  const url = getGameUrl();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

/**
 * Check if Web Share API is available
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}
