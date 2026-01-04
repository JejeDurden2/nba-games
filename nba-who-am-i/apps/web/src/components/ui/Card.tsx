import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the card is clickable (adds hover effect) */
  clickable?: boolean;
}

/**
 * Glass morphism card component with semi-transparent background and backdrop blur
 * Preserves original NBA Who Am I styling with shadcn/ui architecture
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, onClick, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Glassmorphism effect with universe-aware background
        'backdrop-blur-xl',
        // Border and shadows
        'border border-dark-600/50',
        'shadow-2xl',
        // Border radius - larger for glassmorphism cards
        'rounded-3xl',
        // Optional click behavior
        (clickable || onClick) && 'cursor-pointer transition-colors',
        className
      )}
      style={{
        backgroundColor:
          'color-mix(in srgb, var(--universe-bg-card) 80%, transparent)',
        ...style,
      }}
      onClick={onClick}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'font-black leading-none tracking-tight text-white',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-dark-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
