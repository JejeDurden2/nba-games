import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * Footer component with copyright, links, and credits
 */
export function Footer() {
  const isMobile = useIsMobile();
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
            href="https://github.com/anthropics/claude-code/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-500 hover:text-accent-cyan transition-colors"
          >
            🐛 Signaler un bug
          </a>
          <span className="text-dark-600">•</span>
          <a
            href="https://twitter.com/intent/tweet?text=🏀%20NBA%20Who%20Am%20I%20-%20Test%20ton%20QI%20basket%20!&url="
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-500 hover:text-accent-cyan transition-colors"
          >
            🐦 Partager sur X
          </a>
          <span className="text-dark-600">•</span>
          <a
            href="mailto:desmaresjerome@gmail.com?subject=NBA Who Am I - Feedback"
            className="text-dark-500 hover:text-accent-cyan transition-colors"
          >
            ✉️ Contact
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
            Créé avec{' '}
            <span className="text-ball-400" aria-label="amour">
              ❤️
            </span>{' '}
            par{' '}
            <a
              href="https://www.linkedin.com/in/jeromedesmares/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent-cyan transition-colors font-medium"
            >
              Jérôme Desmares
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className={cn('text-dark-600', isMobile ? 'text-xs' : 'text-sm')}>
          <p>© {currentYear} Jérôme Desmares. Tous droits réservés.</p>
          <p className="text-xs mt-1">
            Les noms et logos NBA sont des marques déposées de leurs
            propriétaires respectifs.
          </p>
        </div>
      </div>
    </footer>
  );
}
