import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useWording } from '@/contexts/UniverseContext';

/**
 * Footer component with copyright, links, and credits
 */
export function Footer() {
  const isMobile = useIsMobile();
  const wording = useWording();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'mt-auto pt-8 pb-6 text-center',
        'border-t border-dark-600/30'
      )}
    >
      {/* Main content */}
      <div className={cn('space-y-4', isMobile ? 'px-4' : 'px-6')}>
        {/* Links */}
        <div
          className={cn(
            'flex flex-wrap items-center justify-center gap-4',
            isMobile ? 'text-xs' : 'text-sm'
          )}
        >
          <a
            href="https://twitter.com/intent/tweet?text=🏀%20NBA%20Who%20Am%20I%20-%20Test%20ton%20QI%20basket%20!&url="
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-500 hover:text-universe-accent transition-colors"
          >
            {wording.footer.shareOnX}
          </a>
          <span className="text-dark-600">•</span>
          <a
            href="mailto:desmaresjerome@gmail.com?subject=NBA Who Am I - Feedback"
            className="text-dark-500 hover:text-universe-accent transition-colors"
          >
            {wording.footer.contact}
          </a>
        </div>

        {/* Credits */}
        <div
          className={cn(
            'text-dark-500',
            isMobile ? 'text-xs' : 'text-sm',
            'space-y-1'
          )}
        >
          <p>
            {wording.footer.createdWith}{' '}
            <span className="text-universe-primary" aria-label="amour">
              ❤️
            </span>{' '}
            {wording.footer.by}{' '}
            <a
              href="https://www.linkedin.com/in/jeromedesmares/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-universe-accent transition-colors font-medium"
            >
              Jérôme Desmares
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className={cn('text-dark-600', isMobile ? 'text-xs' : 'text-sm')}>
          <p>
            © {currentYear} Jérôme Desmares. {wording.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
