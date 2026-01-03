import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * This is the shadcn/ui standard utility for className composition
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe responsive value helper
 * Returns mobile value on small screens, desktop value otherwise
 */
export function responsive<T>(mobile: T, desktop: T, isMobile: boolean): T {
  return isMobile ? mobile : desktop;
}
