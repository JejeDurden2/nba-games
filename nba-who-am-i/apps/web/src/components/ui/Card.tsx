import { cn } from '../../lib/design-system/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Glass morphism card component with semi-transparent background and backdrop blur
 */
export function Card({ children, className, onClick }: CardProps) {
  const baseClasses = cn(
    // Glassmorphism effect
    'bg-dark-800/80 backdrop-blur-xl',
    // Border and shadows
    'border border-dark-600/50',
    'shadow-2xl',
    // Border radius
    'rounded-3xl',
    // Optional click behavior
    onClick && 'cursor-pointer hover:bg-dark-800/90 transition-colors',
    // Custom className
    className
  );

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
}
