/**
 * Type definitions for the Horse Racing Game
 */

export interface Horse {
  id: number
  name: string
  condition: number
  color: string
  position?: number
  finishTime?: number
}

export interface Race {
  roundNumber: number
  distance: number
  horses: Horse[]
  status: 'pending' | 'running' | 'completed'
  results?: RaceResult[]
}

export interface RaceResult {
  position: number
  horseName: string
  horseId: number
  time: number
}

export interface RaceProgram {
  races: Race[]
  currentRoundIndex: number
}

export enum GameStatus {
  IDLE = 'idle',
  PROGRAM_GENERATED = 'program_generated',
  RACING = 'racing',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}
