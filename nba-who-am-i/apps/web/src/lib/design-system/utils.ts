/**
 * Design System Utilities
 * Helper functions for working with Tailwind classes and responsive design
 */

/**
 * Combines class names, filtering out falsy values
 * Useful for conditional classes
 *
 * @example
 * cn('px-4', 'py-2', isActive && 'bg-blue-500', 'text-white')
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type-safe responsive value helper
 * Returns mobile value on small screens, desktop value otherwise
 */
export function responsive<T>(mobile: T, desktop: T, isMobile: boolean): T {
  return isMobile ? mobile : desktop;
}
