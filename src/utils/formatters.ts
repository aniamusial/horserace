/**
 * Utility functions for formatting data
 */

/**
 * Converts a number to its ordinal form (1st, 2nd, 3rd, 4th, etc.)
 */
export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  const index = (v - 20) % 10
  const suffix =
    (index >= 0 && index < s.length ? s[index] : undefined) ||
    (v >= 0 && v < s.length ? s[v] : undefined) ||
    'th'
  return n + suffix
}

/**
 * Gets ordinal label for a round number
 */
export function getRoundLabel(round: number): string {
  return getOrdinal(round).toUpperCase()
}

/**
 * Color map for horse colors
 */
const COLOR_NAME_MAP: Record<string, string> = {
  '#FF6B6B': 'Red',
  '#4ECDC4': 'Teal',
  '#FFE66D': 'Yellow',
  '#A8E6CF': 'Mint',
  '#FF8B94': 'Pink',
  '#C7CEEA': 'Lavender',
  '#FFDAC1': 'Peach',
  '#B4F8C8': 'Green',
  '#FBE7C6': 'Cream',
  '#A0E7E5': 'Aqua',
  '#FFAEBC': 'Rose',
  '#B4A7D6': 'Purple',
  '#FFD3B6': 'Apricot',
  '#DCEDC1': 'Lime',
  '#FFA8A8': 'Coral',
  '#A8DADC': 'Sky Blue',
  '#F4ACB7': 'Salmon',
  '#D4A5A5': 'Dusty Rose',
  '#9EE09E': 'Sage',
  '#FFB6B9': 'Blush',
}

/**
 * Converts a hex color code to a human-readable color name
 */
export function getColorName(color: string): string {
  return COLOR_NAME_MAP[color] || 'Unknown'
}
