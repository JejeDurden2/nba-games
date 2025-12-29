import { useEffect, useState } from 'react';
import { breakpoints } from '../lib/design-system/tokens';

/**
 * Hook to detect if a media query matches
 * @param query - Media query string (e.g., '(max-width: 640px)')
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * Hook to detect if viewport is mobile size
 * @returns boolean indicating if viewport is mobile (≤640px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.mobile}px)`);
}

/**
 * Hook to detect if viewport is tablet size
 * @returns boolean indicating if viewport is tablet (≤768px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.tablet}px)`);
}

/**
 * Hook to detect if viewport is desktop size
 * @returns boolean indicating if viewport is desktop (>1024px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.desktop + 1}px)`);
}
