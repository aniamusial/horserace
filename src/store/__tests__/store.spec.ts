/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { store } from '../index'
import { GameStatus } from '@/types'
import type { Horse, Race } from '@/types'

describe('Vuex Store', () => {
  beforeEach(() => {
    store.commit('RESET_GAME')
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(store.state.allHorses).toEqual([])
      expect(store.state.raceProgram).toEqual([])
      expect(store.state.currentRoundIndex).toBe(0)
      expect(store.state.gameStatus).toBe(GameStatus.IDLE)
      expect(store.state.completedRaces).toEqual([])
      expect(store.state.currentRaceSimulation).toBeNull()
      expect(store.state.raceStartTime).toBeNull()
      expect(store.state.racePausedTime).toBeNull()
      expect(store.state.elapsedBeforePause).toBe(0)
    })
  })

  describe('Getters', () => {
    describe('currentRace', () => {
      it('should return null when no program exists', () => {
        expect(store.getters.currentRace).toBeNull()
      })

      it('should return the current race from the program', () => {
        const mockRace: Race = {
          roundNumber: 1,
          distance: 1200,
          horses: [],
          status: 'pending',
        }
        store.state.raceProgram = [mockRace]
        store.state.currentRoundIndex = 0

        expect(store.getters.currentRace).toEqual(mockRace)
      })

      it('should return null when currentRoundIndex is out of bounds', () => {
        store.state.raceProgram = []
        store.state.currentRoundIndex = 5

        expect(store.getters.currentRace).toBeNull()
      })
    })

    describe('isRacing', () => {
      it('should return true when game status is RACING', () => {
        store.state.gameStatus = GameStatus.RACING

        expect(store.getters.isRacing).toBe(true)
      })

      it('should return false when game status is not RACING', () => {
        store.state.gameStatus = GameStatus.IDLE

        expect(store.getters.isRacing).toBe(false)
      })
    })

    describe('isPaused', () => {
      it('should return true when game status is PAUSED', () => {
        store.state.gameStatus = GameStatus.PAUSED

        expect(store.getters.isPaused).toBe(true)
      })

      it('should return false when game status is not PAUSED', () => {
        store.state.gameStatus = GameStatus.RACING

        expect(store.getters.isPaused).toBe(false)
      })
    })

    describe('canGenerate', () => {
      it('should return true when game status is IDLE', () => {
        store.state.gameStatus = GameStatus.IDLE

        expect(store.getters.canGenerate).toBe(true)
      })

      it('should return true when game status is COMPLETED', () => {
        store.state.gameStatus = GameStatus.COMPLETED

        expect(store.getters.canGenerate).toBe(true)
      })

      it('should return false when game status is RACING', () => {
        store.state.gameStatus = GameStatus.RACING

        expect(store.getters.canGenerate).toBe(false)
      })
    })

    describe('canStart', () => {
      it('should return true when game status is PROGRAM_GENERATED', () => {
        store.state.gameStatus = GameStatus.PROGRAM_GENERATED

        expect(store.getters.canStart).toBe(true)
      })

      it('should return true when game status is PAUSED', () => {
        store.state.gameStatus = GameStatus.PAUSED

        expect(store.getters.canStart).toBe(true)
      })

      it('should return true when game status is RACING', () => {
        store.state.gameStatus = GameStatus.RACING

        expect(store.getters.canStart).toBe(true)
      })

      it('should return false when game status is IDLE', () => {
        store.state.gameStatus = GameStatus.IDLE

        expect(store.getters.canStart).toBe(false)
      })
    })
  })

  describe('Mutations', () => {
    describe('GENERATE_PROGRAM', () => {
      it('should generate race program and reset state', () => {
        store.commit('INITIALIZE_HORSES')

        store.commit('GENERATE_PROGRAM')

        expect(store.state.raceProgram).toHaveLength(6)
        expect(store.state.currentRoundIndex).toBe(0)
        expect(store.state.completedRaces).toEqual([])
        expect(store.state.gameStatus).toBe(GameStatus.PROGRAM_GENERATED)
        expect(store.state.currentRaceSimulation).toBeNull()
        expect(store.state.raceStartTime).toBeNull()
        expect(store.state.racePausedTime).toBeNull()
        expect(store.state.elapsedBeforePause).toBe(0)
        expect(store.state.raceProgram[0].distance).toBe(1200)
        expect(store.state.raceProgram[1].distance).toBe(1400)
        expect(store.state.raceProgram[2].distance).toBe(1600)
        expect(store.state.raceProgram[3].distance).toBe(1800)
        expect(store.state.raceProgram[4].distance).toBe(2000)
        expect(store.state.raceProgram[5].distance).toBe(2200)
      })
    })

    describe('START_RACE', () => {
      it('should start a new race with simulated horses', () => {
        const mockHorse: Horse = {
          id: 1,
          name: 'Horse 1',
          condition: 80,
          color: '#FF0000',
          position: 0,
          finishTime: 5000,
        }
        const mockHorses: Horse[] = [mockHorse]
        const mockRace: Race = {
          roundNumber: 1,
          distance: 1200,
          horses: [mockHorse],
          status: 'pending',
        }

        store.state.raceProgram = [mockRace]
        store.state.currentRoundIndex = 0

        const beforeTime = Date.now()
        store.commit('START_RACE', mockHorses)
        const afterTime = Date.now()

        expect(store.state.gameStatus).toBe(GameStatus.RACING)
        expect(store.state.raceProgram[0].status).toBe('running')
        expect(store.state.currentRaceSimulation).toEqual(mockHorses)
        expect(store.state.raceStartTime).toBeGreaterThanOrEqual(beforeTime)
        expect(store.state.raceStartTime).toBeLessThanOrEqual(afterTime)
        expect(store.state.elapsedBeforePause).toBe(0)
      })

      it('should resume race from pause', () => {
        store.state.gameStatus = GameStatus.PAUSED
        store.state.raceStartTime = 1000
        store.state.racePausedTime = 2000
        store.state.elapsedBeforePause = 500

        const beforeTime = Date.now()
        store.commit('START_RACE')
        const afterTime = Date.now()

        expect(store.state.gameStatus).toBe(GameStatus.RACING)
        expect(store.state.elapsedBeforePause).toBe(1500) // 500 + (2000 - 1000)
        expect(store.state.raceStartTime).toBeGreaterThanOrEqual(beforeTime)
        expect(store.state.raceStartTime).toBeLessThanOrEqual(afterTime)
      })
    })

    describe('PAUSE_RACE', () => {
      it('should pause the race', () => {
        const beforeTime = Date.now()
        store.commit('PAUSE_RACE')
        const afterTime = Date.now()

        expect(store.state.gameStatus).toBe(GameStatus.PAUSED)
        expect(store.state.racePausedTime).toBeGreaterThanOrEqual(beforeTime)
        expect(store.state.racePausedTime).toBeLessThanOrEqual(afterTime)
      })
    })

    describe('UPDATE_HORSE_POSITION', () => {
      it('should update horse position in the race', () => {
        const mockHorse: Horse = {
          id: 1,
          name: 'Horse 1',
          condition: 80,
          color: '#FF0000',
          position: 0,
        }
        const mockRace: Race = {
          roundNumber: 1,
          distance: 1200,
          horses: [mockHorse],
          status: 'running',
        }
        store.state.raceProgram = [mockRace]

        store.commit('UPDATE_HORSE_POSITION', {
          roundIndex: 0,
          horseId: 1,
          position: 50,
        })

        expect(store.state.raceProgram[0].horses[0].position).toBe(50)
      })

      it('should do nothing if race does not exist', () => {
        store.state.raceProgram = []

        store.commit('UPDATE_HORSE_POSITION', {
          roundIndex: 0,
          horseId: 1,
          position: 50,
        })

        expect(store.state.raceProgram).toEqual([])
      })

      it('should do nothing if horse does not exist', () => {
        const mockHorse: Horse = {
          id: 1,
          name: 'Horse 1',
          condition: 80,
          color: '#FF0000',
          position: 0,
        }
        const mockRace: Race = {
          roundNumber: 1,
          distance: 1200,
          horses: [mockHorse],
          status: 'running',
        }
        store.state.raceProgram = [mockRace]

        store.commit('UPDATE_HORSE_POSITION', {
          roundIndex: 0,
          horseId: 999,
          position: 50,
        })

        expect(store.state.raceProgram[0].horses[0].position).toBe(0)
      })
    })

    describe('COMPLETE_RACE', () => {
      it('should complete a race and add to completed races', () => {
        const mockHorse: Horse = {
          id: 1,
          name: 'Horse 1',
          condition: 80,
          color: '#FF0000',
          position: 100,
        }
        const mockRace: Race = {
          roundNumber: 1,
          distance: 1200,
          horses: [mockHorse],
          status: 'running',
        }
        const results = [{ position: 1, horseName: 'Horse 1', horseId: 1, time: 5000 }]
        store.state.raceProgram = [mockRace]

        store.commit('COMPLETE_RACE', {
          roundIndex: 0,
          results,
        })

        expect(store.state.raceProgram[0].status).toBe('completed')
        expect(store.state.raceProgram[0].results).toEqual(results)
        expect(store.state.completedRaces).toHaveLength(1)
        expect(store.state.completedRaces[0]).toEqual({
          ...mockRace,
          status: 'completed',
          results,
        })
      })

      it('should do nothing if race does not exist', () => {
        store.state.raceProgram = []

        store.commit('COMPLETE_RACE', {
          roundIndex: 0,
          results: [],
        })

        expect(store.state.completedRaces).toHaveLength(0)
      })
    })

    describe('NEXT_ROUND', () => {
      it('should increment round index and reset timing state', () => {
        store.state.currentRoundIndex = 0
        store.state.raceProgram = [
          { roundNumber: 1, distance: 1200, horses: [], status: 'completed' },
          { roundNumber: 2, distance: 1400, horses: [], status: 'pending' },
        ]

        store.commit('NEXT_ROUND')

        expect(store.state.currentRoundIndex).toBe(1)
        expect(store.state.currentRaceSimulation).toBeNull()
        expect(store.state.raceStartTime).toBeNull()
        expect(store.state.racePausedTime).toBeNull()
        expect(store.state.elapsedBeforePause).toBe(0)
        expect(store.state.gameStatus).toBe(GameStatus.PROGRAM_GENERATED)
      })

      it('should set status to COMPLETED when all races are done', () => {
        store.state.currentRoundIndex = 0
        store.state.raceProgram = [
          { roundNumber: 1, distance: 1200, horses: [], status: 'completed' },
        ]

        store.commit('NEXT_ROUND')

        expect(store.state.currentRoundIndex).toBe(1)
        expect(store.state.gameStatus).toBe(GameStatus.COMPLETED)
      })
    })

    describe('RESET_GAME', () => {
      it('should reset all game state', () => {
        store.state.raceProgram = [
          { roundNumber: 1, distance: 1200, horses: [], status: 'completed' },
        ]
        store.state.currentRoundIndex = 3
        store.state.completedRaces = [
          { roundNumber: 1, distance: 1200, horses: [], status: 'completed' },
        ]
        store.state.gameStatus = GameStatus.RACING

        store.commit('RESET_GAME')

        expect(store.state.raceProgram).toEqual([])
        expect(store.state.currentRoundIndex).toBe(0)
        expect(store.state.completedRaces).toEqual([])
        expect(store.state.gameStatus).toBe(GameStatus.IDLE)
        expect(store.state.currentRaceSimulation).toBeNull()
        expect(store.state.raceStartTime).toBeNull()
        expect(store.state.racePausedTime).toBeNull()
        expect(store.state.elapsedBeforePause).toBe(0)
      })
    })
  })
})
