import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * Button variants using class-variance-authority
 * Preserves original NBA Who Am I styling with shadcn/ui architecture
 */
const buttonVariants = cva(
  // Base styles - preserved from original design
  [
    'inline-flex items-center justify-center',
    'font-black uppercase tracking-wider',
    'rounded-2xl border-none',
    'transition-all duration-200',
    'cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-white/20',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        // Original variants with exact same colors
        primary: 'bg-gradient-fire text-white',
        secondary: 'bg-dark-700 text-white hover:bg-dark-600',
        danger: 'bg-rim-500 text-white hover:bg-rim-600',
        // shadcn standard variants mapped to design system
        default: 'bg-gradient-fire text-white',
        destructive: 'bg-rim-500 text-white hover:bg-rim-600',
        outline:
          'border-2 border-dark-600 bg-transparent text-white hover:bg-dark-700',
        ghost: 'bg-transparent text-white hover:bg-dark-700/50',
        link: 'text-universe-accent underline-offset-4 hover:underline bg-transparent',
      },
      // Desktop sizes - mobile sizes handled via responsive prop
      size: {
        sm: 'px-4 py-2.5 text-sm',
        md: 'px-8 py-4 text-base',
        lg: 'px-12 py-5 text-xl',
        default: 'px-8 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Mobile size mappings - smaller padding and text on mobile
const mobileSizeClasses: Record<string, string> = {
  sm: 'px-4 py-2.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  default: 'px-6 py-3 text-sm',
  icon: 'h-9 w-9',
};

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Custom gradient CSS for the button background */
  gradient?: string;
  /** Custom glow effect (box-shadow color) */
  glow?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      gradient,
      glow,
      style,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const Comp = asChild ? Slot : 'button';

    // Get responsive size classes
    const sizeKey = size || 'default';
    const responsiveSize = isMobile
      ? mobileSizeClasses[sizeKey] || mobileSizeClasses.default
      : undefined;

    // Custom gradient style (for gradient buttons like GlowButton)
    const customStyle: React.CSSProperties | undefined =
      gradient || glow
        ? {
            ...style,
            background: gradient || undefined,
            boxShadow: glow ? `0 0 30px ${glow}` : undefined,
          }
        : style;

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: gradient ? undefined : variant, // Skip variant bg if gradient provided
            size: isMobile ? undefined : size, // Skip desktop size on mobile
            className,
          }),
          // Apply mobile sizes when on mobile
          isMobile && responsiveSize,
          // When gradient is provided, only apply base styles without variant bg
          gradient && 'text-white'
        )}
        ref={ref}
        style={customStyle}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
