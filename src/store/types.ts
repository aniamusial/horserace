import type { Horse, Race, RaceResult, GameStatus } from '@/types'

export interface State {
  allHorses: Horse[]
  raceProgram: Race[]
  currentRoundIndex: number
  gameStatus: GameStatus
  completedRaces: Race[]
  currentRaceSimulation: Horse[] | null
  raceStartTime: number | null
  racePausedTime: number | null
  elapsedBeforePause: number
}

export interface UpdateHorsePositionPayload {
  roundIndex: number
  horseId: number
  position: number
}

export interface CompleteRacePayload {
  roundIndex: number
  results: RaceResult[]
}
