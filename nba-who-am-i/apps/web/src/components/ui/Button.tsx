import { cn } from '../../lib/design-system/utils';
import { useIsMobile } from '../../hooks/useMediaQuery';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  gradient?: string;
  glow?: string;
}

/**
 * Stylized button component with gradient backgrounds and glow effects
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  gradient,
  glow,
}: ButtonProps) {
  const isMobile = useIsMobile();

  // Size mappings
  const sizeClasses = {
    sm: isMobile ? 'px-4 py-2.5 text-xs' : 'px-4 py-2.5 text-sm',
    md: isMobile ? 'px-6 py-3 text-sm' : 'px-8 py-4 text-base',
    lg: isMobile ? 'px-8 py-4 text-base' : 'px-12 py-5 text-xl',
  };

  // Variant base styles (for non-gradient buttons)
  const variantClasses = {
    primary: !gradient && 'bg-gradient-fire text-white',
    secondary: !gradient && 'bg-dark-700 text-white hover:bg-dark-600',
    danger: !gradient && 'bg-rim-500 text-white hover:bg-rim-600',
  };

  const baseClasses = cn(
    // Base styles
    'font-black uppercase tracking-wider',
    'rounded-2xl border-none',
    'transition-all duration-200',
    'cursor-pointer',
    // Focus styles
    'focus:outline-none focus:ring-2 focus:ring-white/20',
    // Disabled styles
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    // Size
    sizeClasses[size],
    // Variant (if no gradient)
    variantClasses[variant],
    // Custom className
    className
  );

  // Custom gradient style (for gradient buttons like GlowButton)
  const customStyle = gradient
    ? {
        background: gradient,
        boxShadow: glow ? `0 0 30px ${glow}` : undefined,
      }
    : undefined;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={customStyle}
    >
      {children}
    </button>
  );
}
