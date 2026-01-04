import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * Input variants using class-variance-authority
 * Preserves original NBA Who Am I styling with shadcn/ui architecture
 */
const inputVariants = cva(
  // Base styles - preserved from original design
  [
    'flex w-full',
    'bg-dark-800 border-2 rounded-2xl',
    'text-white placeholder-dark-500',
    'outline-none transition-all',
  ],
  {
    variants: {
      state: {
        default: 'border-dark-600 focus:border-white/20',
        error: 'border-universe-primary animate-shake',
        success: 'border-universe-accent bg-universe-accent/10',
      },
      // Desktop sizes - mobile sizes handled via responsive prop
      size: {
        default: 'px-6 py-4.5 text-lg',
        sm: 'px-4 py-3 text-sm',
        lg: 'px-8 py-5 text-xl',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'default',
    },
  }
);

// Mobile size mappings
const mobileSizeClasses: Record<string, string> = {
  default: 'px-4 py-3.5 text-base',
  sm: 'px-3 py-2.5 text-sm',
  lg: 'px-6 py-4 text-lg',
};

export interface InputProps
  extends
    Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, state, size, ...props }, ref) => {
    const isMobile = useIsMobile();

    // Get responsive size classes
    const sizeKey = size || 'default';
    const responsiveSize = isMobile
      ? mobileSizeClasses[sizeKey] || mobileSizeClasses.default
      : undefined;

    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            state,
            size: isMobile ? undefined : size,
            className,
          }),
          // Apply mobile sizes when on mobile
          isMobile && responsiveSize
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
