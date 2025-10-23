import type { Horse, Race } from '@/types'

const HORSE_NAMES = [
  'Ada Lovelace',
  'Grace Hopper',
  'Alan Turing',
  'Margaret Hamilton',
  'Donald Knuth',
  'John von Neumann',
  'Claude Shannon',
  'Barbara Liskov',
  'Edsger Dijkstra',
  'Frances Allen',
  'Tim Berners-Lee',
  'Dennis Ritchie',
  'Ken Thompson',
  'Joan Clarke',
  'Hedy Lamarr',
  'Katherine Johnson',
  'Annie Easley',
  'Ada Yonath',
  'Rear Admiral Hopper',
  'Dorothy Vaughan',
]

const HORSE_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#A8E6CF', // Mint
  '#FF8B94', // Pink
  '#C7CEEA', // Lavender
  '#FFDAC1', // Peach
  '#B4F8C8', // Light Green
  '#FBE7C6', // Cream
  '#A0E7E5', // Aqua
  '#FFAEBC', // Rose
  '#B4A7D6', // Purple
  '#FFD3B6', // Apricot
  '#DCEDC1', // Lime
  '#FFA8A8', // Coral
  '#A8DADC', // Sky Blue
  '#F4ACB7', // Salmon
  '#D4A5A5', // Dusty Rose
  '#9EE09E', // Sage
  '#FFB6B9', // Blush
]

export function generateHorses(): Horse[] {
  return HORSE_NAMES.map((name, index) => ({
    id: index + 1,
    name,
    condition: Math.floor(Math.random() * 100) + 1,
    color: HORSE_COLORS[index] || '#999999',
  }))
}

export function selectRandomHorses(allHorses: Horse[], count: number = 10): Horse[] {
  const shuffled = [...allHorses].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((horse) => ({
    ...horse,
    position: 0,
    finishTime: undefined,
  }))
}

export function generateRaceProgram(allHorses: Horse[]): Race[] {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]

  return distances.map((distance, index) => ({
    roundNumber: index + 1,
    distance,
    horses: selectRandomHorses(allHorses),
    status: 'pending',
    results: undefined,
  }))
}

export function calculateHorseSpeed(horse: Horse, distance: number): number {
  // Base speed from condition (0.5 to 1.5)
  const conditionFactor = (horse.condition / 100) * 1.0 + 0.5

  // Distance factor (longer distances slightly favor higher condition horses)
  // Normalize distance (1200-2200) to a factor (0.95-1.05)
  const normalizedDistance = (distance - 1700) / 1000
  const distanceFactor = 1 + normalizedDistance * 0.1 + Math.random() * 0.3

  // Random factor for unpredictability
  const randomFactor = 0.8 + Math.random() * 0.4

  return conditionFactor * distanceFactor * randomFactor
}

/**
 * Simulates a race and calculates finish times
 */
export function simulateRace(race: Race): Horse[] {
  const horsesWithTimes = race.horses.map((horse) => {
    const speed = calculateHorseSpeed(horse, race.distance)
    // Base time is distance dependent (in milliseconds for animation)
    const baseTime = race.distance * 8 // 8ms per meter
    const finishTime = baseTime / speed

    return {
      ...horse,
      finishTime,
      position: 0,
    }
  })

  // Sort by finish time (fastest first)
  return horsesWithTimes.sort((a, b) => (a.finishTime || 0) - (b.finishTime || 0))
}
