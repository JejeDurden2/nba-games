/**
 * Interpolation Utility
 * Handle placeholder replacement in wording strings
 */

/**
 * Values that can be interpolated in templates
 */
export interface InterpolationValues {
  answer?: string;
  hints?: number;
  percentile?: number;
  playerName?: string;
  totalScore?: number;
  maxStreak?: number;
  round?: number;
  level?: number;
  year?: number;
}

/**
 * Interpolate placeholders in a template string
 * Supports: {answer}, {percentile}, {playerName}, {totalScore}, etc.
 *
 * @param template - Template string with {placeholder} markers
 * @param values - Object with values to interpolate
 * @returns Interpolated string
 *
 * @example
 * t("Tu as explosé {percentile}% des joueurs !", { percentile: 85 })
 * // Returns: "Tu as explosé 85% des joueurs !"
 */
export function t(template: string, values?: InterpolationValues): string {
  if (!values) return template;

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = values[key as keyof InterpolationValues];
    if (value !== undefined && value !== null) {
      return String(value);
    }
    // Keep the placeholder if no value provided
    return match;
  });
}

/**
 * Helper to get the appropriate encouraging message based on percentile
 */
export function getEncouragingMessageKey(
  percentile?: number,
  allLevelsCleared?: boolean
):
  | 'allCleared'
  | 'noPercentile'
  | 'top90'
  | 'top75'
  | 'top50'
  | 'top25'
  | 'default' {
  if (allLevelsCleared) return 'allCleared';
  if (!percentile) return 'noPercentile';
  if (percentile >= 90) return 'top90';
  if (percentile >= 75) return 'top75';
  if (percentile >= 50) return 'top50';
  if (percentile >= 25) return 'top25';
  return 'default';
}
