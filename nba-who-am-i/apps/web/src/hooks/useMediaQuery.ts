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
