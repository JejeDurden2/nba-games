/**
 * Fuzzy name matching for NBA character guesses
 * Handles common variations, typos, and different name formats
 */

function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/['\-.]/g, '') // Remove apostrophes, hyphens, dots
    .replace(/\s+/g, ' '); // Normalize whitespace
}

function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function fuzzyMatch(guess: string, correctAnswer: string): boolean {
  const normalizedGuess = normalize(guess);
  const normalizedAnswer = normalize(correctAnswer);

  // Exact match
  if (normalizedGuess === normalizedAnswer) {
    return true;
  }

  // Check if guess contains all parts of the name (for "michael jordan" -> "jordan" or "michael")
  const answerParts = normalizedAnswer.split(' ');
  const guessParts = normalizedGuess.split(' ');

  // Single word guess matching any part of full name
  if (guessParts.length === 1 && answerParts.length > 1) {
    const singleGuess = guessParts[0];
    // Check if it's a significant part of the name (last name or first name)
    // Must be at least 3 characters to avoid false positives
    if (singleGuess.length >= 3) {
      for (const part of answerParts) {
        if (part === singleGuess || part.startsWith(singleGuess)) {
          return true;
        }
      }
    }
  }

  // Allow small typos using Levenshtein distance
  // For names longer than 5 chars, allow up to 2 character difference
  // For shorter names, allow 1 character difference
  const maxDistance = normalizedAnswer.length > 5 ? 2 : 1;
  const distance = calculateLevenshteinDistance(
    normalizedGuess,
    normalizedAnswer
  );

  if (distance <= maxDistance) {
    return true;
  }

  // Check partial matches for multi-word names
  // e.g., "lebron" matches "LeBron James"
  if (answerParts.length > 1 && guessParts.length >= 1) {
    // Check if all guess parts match answer parts with small typos
    let matchedParts = 0;
    for (const guessPart of guessParts) {
      for (const answerPart of answerParts) {
        const partDistance = calculateLevenshteinDistance(
          guessPart,
          answerPart
        );
        const partMaxDistance = answerPart.length > 5 ? 2 : 1;
        if (partDistance <= partMaxDistance) {
          matchedParts++;
          break;
        }
      }
    }
    // If we matched all guess parts, it's a match
    if (matchedParts === guessParts.length && guessParts.length > 0) {
      return true;
    }
  }

  return false;
}
