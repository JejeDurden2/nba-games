import { hasUniverse, getUniverseIds } from '@nba-who-am-i/shared';

/**
 * Get universe ID from URL path
 * Example: /one-piece/play → 'one-piece'
 */
function getUniverseFromPath(): string | null {
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment && hasUniverse(firstSegment)) {
    return firstSegment;
  }

  return null;
}

/**
 * Get universe ID from subdomain
 * Example: onepiece.domain.com → 'one-piece' (with normalization)
 */
function getUniverseFromSubdomain(): string | null {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Check if we have a subdomain (more than just domain.tld)
  if (parts.length >= 2) {
    const subdomain = parts[0];

    // Skip common non-universe subdomains
    if (
      subdomain === 'www' ||
      subdomain === 'api' ||
      subdomain === 'localhost'
    ) {
      return null;
    }

    // Normalize subdomain (onepiece → one-piece)
    const normalizedSubdomain = subdomain.toLowerCase();

    if (hasUniverse(normalizedSubdomain)) {
      return normalizedSubdomain;
    }

    // Try with dash conversion (onepiece → one-piece)
    const withDash = normalizedSubdomain.replace(/(\w)piece$/, '$1-piece');
    if (hasUniverse(withDash)) {
      return withDash;
    }
  }

  return null;
}

/**
 * Get universe ID from query parameter
 * Example: ?universe=one-piece → 'one-piece'
 */
function getUniverseFromQuery(): string | null {
  const params = new URLSearchParams(window.location.search);
  const universeParam = params.get('universe');

  if (universeParam && hasUniverse(universeParam)) {
    return universeParam;
  }

  return null;
}

/**
 * Get universe ID from environment variable
 */
function getUniverseFromEnv(): string | null {
  const envUniverse = import.meta.env.VITE_DEFAULT_UNIVERSE;

  if (envUniverse && hasUniverse(envUniverse)) {
    return envUniverse;
  }

  return null;
}

/**
 * Detect universe from various sources
 * Priority: URL path → subdomain → query param → env var → 'nba'
 */
export function detectUniverse(): string {
  // 1. Check URL path (highest priority for direct links)
  const pathUniverse = getUniverseFromPath();
  if (pathUniverse) return pathUniverse;

  // 2. Check subdomain
  const subdomainUniverse = getUniverseFromSubdomain();
  if (subdomainUniverse) return subdomainUniverse;

  // 3. Check query parameter (useful for dev/testing)
  const queryUniverse = getUniverseFromQuery();
  if (queryUniverse) return queryUniverse;

  // 4. Check environment variable
  const envUniverse = getUniverseFromEnv();
  if (envUniverse) return envUniverse;

  // 5. Default to NBA
  return 'nba';
}

/**
 * Get all valid universe slugs for routing
 */
export function getValidUniverseSlugs(): string[] {
  return getUniverseIds();
}
