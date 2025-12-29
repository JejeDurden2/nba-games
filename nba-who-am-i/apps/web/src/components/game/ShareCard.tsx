import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AchievementGrid } from './AchievementGrid';
import {
  ShareData,
  shareResults,
  shareOnTwitter,
  copyShareText,
  generateShareText,
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
  const [copySuccess, setCopySuccess] = useState(false);
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
      // Fallback to copy - show success message
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Card
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
              {allLevelsCleared ? 'CHAMPION NBA!' : 'MES RÉSULTATS'}
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
              <div className="text-xs text-dark-500 mb-1">STREAK</div>
              <div className="text-2xl font-black text-ball-400">
                {maxStreak}🔥
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
            {/* Primary share button */}
            {hasWebShare ? (
              <Button onClick={handleShare} size="lg" className="w-full">
                📤 Partager mes résultats
              </Button>
            ) : (
              <>
                {/* Twitter/X Button */}
                <Button
                  onClick={handleTwitter}
                  size="lg"
                  className="w-full"
                  gradient="linear-gradient(135deg, #1DA1F2 0%, #0C85D0 100%)"
                  glow="rgba(29,161,242,0.4)"
                >
                  𝕏 Partager sur Twitter
                </Button>

                {/* Copy button */}
                <Button
                  onClick={handleCopy}
                  size="md"
                  variant="secondary"
                  className="w-full"
                >
                  {copySuccess ? '✓ Copié!' : '📋 Copier le texte'}
                </Button>
              </>
            )}

            {/* Close button */}
            <Button
              onClick={onClose}
              size="sm"
              variant="secondary"
              className="w-full"
            >
              Fermer
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
