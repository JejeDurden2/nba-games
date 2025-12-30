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
 * Generate share text based on game results (with basketball trash talk)
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
    return `🏆 ${playerName} vient de DOMINER NBA Who Am I ! 🏆

🎮 GAMEBREAKER UNLOCKED ! Les 5 niveaux ANNIHILÉS
🔥 Streak en feu : ${maxStreak} - BANG ! BANG !
⭐ ${totalScore} points au compteur
🎯 ${round} rounds - WITH NO REGARD FOR HUMAN LIFE !

WHERE YOU AT ?! Tu crois pouvoir me battre ? BALL OR FALL ! 😤🏀`;
  }

  return `🏀 NBA Who Am I - THAT'S GAME !

👤 ${playerName} est passé sur le terrain
📊 ${totalScore} points scored - ARE YOU KIDDING ME ?!
🔥 ${maxStreak} streak (cooking !)
🎯 Round ${round}
⭐ Niveau ${highestLevelCleared}/5 unlocked

T'as GOT THE SKILLS TO PAY THE BILLS ? Step up ! 💪`;
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

/**
 * Share on WhatsApp
 */
export function shareOnWhatsApp(data: ShareData): void {
  const text = generateShareText(data);
  const url = getGameUrl();
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Share on Instagram (copy text and prompt user)
 * Instagram doesn't have direct web share, so we copy text and guide user
 */
export async function shareOnInstagram(data: ShareData): Promise<boolean> {
  const text = generateShareText(data);
  const url = getGameUrl();
  const fullText = `${text}\n\n${url}`;

  // Copy to clipboard first
  const copied = await copyShareText(fullText);

  if (copied) {
    // Show alert with instructions
    alert(
      '📋 Texte copié ! Time to flex ! 💪\n\n' +
        'Pour partager sur Instagram :\n' +
        '1. Ouvre Instagram\n' +
        '2. Crée une Story ou un Post\n' +
        '3. Colle le texte (déjà copié)\n\n' +
        'Ou utilise le bouton "Copier l\'image" pour faire encore + de bruit ! 🔥'
    );
  }

  return copied;
}

/**
 * Generate image from HTML element using html2canvas
 */
export async function generateShareImage(
  element: HTMLElement
): Promise<Blob | null> {
  try {
    const html2canvas = (await import('html2canvas')).default;

    // Generate canvas from element
    const canvas = await html2canvas(element, {
      backgroundColor: '#09090B', // dark-900
      scale: 2, // Higher quality
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

/**
 * Copy image to clipboard
 */
export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    // Check if Clipboard API supports images
    if (!navigator.clipboard || !navigator.clipboard.write) {
      throw new Error('Clipboard API not supported');
    }

    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch (error) {
    console.error('Error copying image to clipboard:', error);
    return false;
  }
}

/**
 * Download image as file
 */
export function downloadImage(
  blob: Blob,
  filename = 'nba-who-am-i-results.png'
): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
