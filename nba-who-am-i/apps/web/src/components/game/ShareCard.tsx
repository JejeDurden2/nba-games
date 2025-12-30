import { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AchievementGrid } from './AchievementGrid';
import {
  ShareData,
  shareResults,
  shareOnTwitter,
  shareOnWhatsApp,
  shareOnFacebook,
  shareOnInstagram,
  copyShareText,
  generateShareText,
  generateShareImage,
  copyImageToClipboard,
  downloadImage,
  getGameUrl,
  canUseWebShare,
} from '../../lib/share-utils';
import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface ShareCardProps extends ShareData {
  onClose: () => void;
}

/**
 * Shareable result card with social sharing buttons
 */
export function ShareCard(props: ShareCardProps) {
  const {
    playerName,
    totalScore,
    maxStreak,
    round,
    difficulty,
    highestLevelCleared,
    allLevelsCleared,
    onClose,
  } = props;

  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const hasWebShare = canUseWebShare();

  const shareData: ShareData = {
    playerName,
    totalScore,
    maxStreak,
    round,
    difficulty,
    highestLevelCleared,
    allLevelsCleared,
  };

  const handleShare = async () => {
    const success = await shareResults(shareData);
    if (!hasWebShare && success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCopy = async () => {
    const text = generateShareText(shareData) + '\n\n' + getGameUrl();
    const success = await copyShareText(text);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleTwitter = () => {
    shareOnTwitter(shareData);
  };

  const handleWhatsApp = () => {
    shareOnWhatsApp(shareData);
  };

  const handleFacebook = () => {
    shareOnFacebook(shareData);
  };

  const handleInstagram = async () => {
    if (!cardRef.current) return;

    setIsGeneratingImage(true);
    try {
      // Generate and download image automatically
      const blob = await generateShareImage(cardRef.current);
      if (blob) {
        downloadImage(
          blob,
          `nba-who-am-i-${playerName.toLowerCase().replace(/\s+/g, '-')}.png`
        );
        // Also copy text
        await shareOnInstagram(shareData);
      }
    } catch (error) {
      console.error('Error generating Instagram image:', error);
      alert("❌ Erreur lors de la génération de l'image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;

    setIsGeneratingImage(true);
    try {
      const blob = await generateShareImage(cardRef.current);
      if (blob) {
        const success = await copyImageToClipboard(blob);
        if (success) {
          setImageSuccess(true);
          setTimeout(() => setImageSuccess(false), 2000);
        } else {
          // Fallback: download image if clipboard fails
          downloadImage(blob);
          alert('📥 Image téléchargée ! Tu peux maintenant la partager.');
        }
      }
    } catch (error) {
      console.error('Error copying image:', error);
      alert("❌ Erreur lors de la copie de l'image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div className="my-auto" onClick={(e) => e.stopPropagation()}>
        <Card
          ref={cardRef}
          className={cn('relative max-w-md w-full', isMobile ? 'p-6' : 'p-8')}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4',
              'text-dark-500 hover:text-white',
              'transition-colors text-2xl'
            )}
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className={cn('mb-2', isMobile ? 'text-4xl' : 'text-5xl')}>
              {allLevelsCleared ? '🏆' : '🏀'}
            </div>
            <h2
              className={cn(
                'font-black mb-2',
                isMobile ? 'text-xl' : 'text-2xl',
                allLevelsCleared ? 'text-accent-yellow' : 'text-white'
              )}
            >
              {allLevelsCleared ? 'HALL OF FAME ! 👑' : 'MY STATS'}
            </h2>
            <p className={cn('font-bold', isMobile ? 'text-lg' : 'text-xl')}>
              {playerName}
            </p>
          </div>

          {/* Achievement Badges */}
          {highestLevelCleared > 0 && (
            <div className="mb-6">
              <AchievementGrid
                highestLevelCleared={highestLevelCleared}
                allLevelsCleared={allLevelsCleared}
                size="sm"
              />
            </div>
          )}

          {/* Stats Grid */}
          <div
            className={cn(
              'grid grid-cols-2 gap-4 mb-6',
              'bg-dark-700/50 rounded-2xl',
              isMobile ? 'p-4' : 'p-5'
            )}
          >
            <div className="text-center">
              <div className="text-xs text-dark-500 mb-1">SCORE</div>
              <div className="text-2xl font-black text-accent-cyan">
                {totalScore}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-dark-500 mb-1">GAMEBREAKER</div>
              <div className="text-2xl font-black text-ball-400">
                {maxStreak}🎮
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-dark-500 mb-1">ROUNDS</div>
              <div className="text-2xl font-black text-white">{round}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-dark-500 mb-1">NIVEAU</div>
              <div className="text-2xl font-black text-accent-green">
                {highestLevelCleared}/5
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col gap-3">
            {/* Title */}
            <div className="text-center mb-1">
              <p className="text-sm font-bold text-dark-400">
                PARTAGE TON SCORE ! 📤
              </p>
            </div>

            {/* Web Share API (mobile only) */}
            {hasWebShare && (
              <Button onClick={handleShare} size="lg" className="w-full mb-2">
                📤 Partager mes résultats
              </Button>
            )}

            {/* Social Media Grid - Always show on desktop, show below web share on mobile */}
            <div
              className={cn(
                'grid gap-3',
                hasWebShare ? 'grid-cols-2' : 'grid-cols-2'
              )}
            >
              {/* Twitter/X Button */}
              <Button
                onClick={handleTwitter}
                size="md"
                className="w-full"
                gradient="linear-gradient(135deg, #1DA1F2 0%, #0C85D0 100%)"
                glow="rgba(29,161,242,0.4)"
              >
                𝕏 Twitter
              </Button>

              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsApp}
                size="md"
                className="w-full"
                gradient="linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
                glow="rgba(37,211,102,0.4)"
              >
                📱 WhatsApp
              </Button>

              {/* Facebook Button */}
              <Button
                onClick={handleFacebook}
                size="md"
                className="w-full"
                gradient="linear-gradient(135deg, #1877F2 0%, #0C5DBF 100%)"
                glow="rgba(24,119,242,0.4)"
              >
                📘 Facebook
              </Button>

              {/* Instagram Button - Downloads image + copies text */}
              <Button
                onClick={handleInstagram}
                size="md"
                className="w-full"
                gradient="linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)"
                glow="rgba(245,133,41,0.4)"
                disabled={isGeneratingImage}
              >
                {isGeneratingImage ? '⏳' : '📷 Instagram'}
              </Button>
            </div>

            {/* Utility Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dark-700">
              {/* Copy Image Button */}
              <Button
                onClick={handleCopyImage}
                size="sm"
                variant="secondary"
                className="w-full"
                disabled={isGeneratingImage}
              >
                {isGeneratingImage
                  ? '⏳'
                  : imageSuccess
                    ? '✓ Copié !'
                    : '🖼️ Copier image'}
              </Button>

              {/* Copy Text Button */}
              <Button
                onClick={handleCopy}
                size="sm"
                variant="secondary"
                className="w-full"
              >
                {copySuccess ? '✓ Copié !' : '📋 Copier texte'}
              </Button>
            </div>

            {/* Close button */}
            <Button
              onClick={onClose}
              size="sm"
              variant="secondary"
              className="w-full mt-2"
            >
              Fermer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
