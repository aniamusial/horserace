import { createStore } from 'vuex'
import type { Horse, Race, RaceResult } from '@/types'
import { GameStatus } from '@/types'
import { generateHorses, generateRaceProgram, simulateRace } from '@/utils/horseGenerator'
import type { State, UpdateHorsePositionPayload, CompleteRacePayload } from '@/store/types'

const PROGRESS_COMPLETE = 100
const INITIAL_ROUND_INDEX = 0

// Helper function to reset race timing state
const resetRaceTimingState = (state: State) => {
  state.currentRaceSimulation = null
  state.raceStartTime = null
  state.racePausedTime = null
  state.elapsedBeforePause = 0
}

export const store = createStore<State>({
  state: {
    allHorses: [],
    raceProgram: [],
    currentRoundIndex: 0,
    gameStatus: GameStatus.IDLE,
    completedRaces: [],
    currentRaceSimulation: null,
    raceStartTime: null,
    racePausedTime: null,
    elapsedBeforePause: 0,
  },

  getters: {
    currentRace: (state): Race | null => {
      if (state.currentRoundIndex < state.raceProgram.length) {
        return state.raceProgram[state.currentRoundIndex] ?? null
      }
      return null
    },

    isRacing: (state): boolean => {
      return state.gameStatus === GameStatus.RACING
    },

    isPaused: (state): boolean => {
      return state.gameStatus === GameStatus.PAUSED
    },

    canGenerate: (state): boolean => {
      return state.gameStatus === GameStatus.IDLE || state.gameStatus === GameStatus.COMPLETED
    },

    canStart: (state): boolean => {
      return (
        state.gameStatus === GameStatus.PROGRAM_GENERATED ||
        state.gameStatus === GameStatus.PAUSED ||
        state.gameStatus === GameStatus.RACING
      )
    },
  },

  mutations: {
    INITIALIZE_HORSES(state) {
      state.allHorses = generateHorses()
    },

    GENERATE_PROGRAM(state) {
      state.raceProgram = generateRaceProgram(state.allHorses)
      state.currentRoundIndex = INITIAL_ROUND_INDEX
      state.completedRaces = []
      state.gameStatus = GameStatus.PROGRAM_GENERATED
      resetRaceTimingState(state)
    },

    START_RACE(state, simulatedHorses?: Horse[]) {
      state.gameStatus = GameStatus.RACING
      if (state.currentRoundIndex < state.raceProgram.length) {
        const race = state.raceProgram[state.currentRoundIndex]
        if (race) {
          race.status = 'running'
        }
      }
      if (simulatedHorses) {
        state.currentRaceSimulation = simulatedHorses
        state.raceStartTime = Date.now()
        state.elapsedBeforePause = 0
      } else if (state.racePausedTime && state.raceStartTime) {
        state.elapsedBeforePause += state.racePausedTime - state.raceStartTime
        state.raceStartTime = Date.now()
      }
    },

    PAUSE_RACE(state) {
      state.gameStatus = GameStatus.PAUSED
      state.racePausedTime = Date.now()
    },

    UPDATE_HORSE_POSITION(state, payload: UpdateHorsePositionPayload) {
      const race = state.raceProgram[payload.roundIndex]
      if (!race) return

      const horse = race.horses.find((horse) => horse.id === payload.horseId)
      if (horse) {
        horse.position = payload.position
      }
    },

    COMPLETE_RACE(state, payload: CompleteRacePayload) {
      const race = state.raceProgram[payload.roundIndex]
      if (!race) return

      race.status = 'completed'
      race.results = payload.results
      state.completedRaces.push({ ...race })
    },

    NEXT_ROUND(state) {
      state.currentRoundIndex++
      resetRaceTimingState(state)
      if (state.currentRoundIndex >= state.raceProgram.length) {
        state.gameStatus = GameStatus.COMPLETED
      } else {
        state.gameStatus = GameStatus.PROGRAM_GENERATED
      }
    },

    RESET_GAME(state) {
      state.raceProgram = []
      state.currentRoundIndex = INITIAL_ROUND_INDEX
      state.completedRaces = []
      state.gameStatus = GameStatus.IDLE
      resetRaceTimingState(state)
    },
  },

  actions: {
    initializeGame({ commit, state }) {
      if (state.allHorses.length === 0) {
        commit('INITIALIZE_HORSES')
      }
    },

    generateProgram({ commit }) {
      commit('GENERATE_PROGRAM')
    },

    async startRace({ commit, state, dispatch }) {
      if (state.currentRoundIndex >= state.raceProgram.length) {
        return
      }

      const currentRace = state.raceProgram[state.currentRoundIndex]
      if (!currentRace) {
        return
      }

      if (!state.currentRaceSimulation) {
        const simulatedRace = simulateRace(currentRace)
        commit('START_RACE', simulatedRace)
      } else {
        commit('START_RACE')
      }

      await dispatch('animateRace')

      const allHorsesFinished = state.currentRaceSimulation?.every((horse) => {
        const raceHorse = currentRace.horses.find((raceHorse) => raceHorse.id === horse.id)
        return raceHorse && (raceHorse.position ?? 0) >= PROGRESS_COMPLETE
      })

      if (
        allHorsesFinished &&
        state.gameStatus !== GameStatus.PAUSED &&
        state.currentRaceSimulation
      ) {
        const results: RaceResult[] = state.currentRaceSimulation.map((horse, index) => ({
          position: index + 1,
          horseName: horse.name,
          horseId: horse.id,
          time: horse.finishTime || 0,
        }))

        commit('COMPLETE_RACE', {
          roundIndex: state.currentRoundIndex,
          results,
        })

        commit('NEXT_ROUND')

        if (state.gameStatus === GameStatus.PROGRAM_GENERATED) {
          dispatch('startRace')
        }
      }
    },

    animateRace({ commit, state }) {
      return new Promise<void>((resolve) => {
        if (!state.currentRaceSimulation || !state.raceStartTime) {
          resolve()
          return
        }

        const simulatedHorses = state.currentRaceSimulation
        const slowestTime = Math.max(...simulatedHorses.map((horse) => horse.finishTime || 0))

        const animate = () => {
          if (!state.raceStartTime) {
            resolve()
            return
          }

          const currentElapsed = Date.now() - state.raceStartTime
          const totalElapsed = state.elapsedBeforePause + currentElapsed

          let allFinished = true

          simulatedHorses.forEach((horse) => {
            const finishTime = horse.finishTime || slowestTime
            const progress = Math.min(
              (totalElapsed / finishTime) * PROGRESS_COMPLETE,
              PROGRESS_COMPLETE,
            )

            commit('UPDATE_HORSE_POSITION', {
              roundIndex: state.currentRoundIndex,
              horseId: horse.id,
              position: progress,
            })

            if (progress < PROGRESS_COMPLETE) {
              allFinished = false
            }
          })

          if (!allFinished && state.gameStatus === GameStatus.RACING) {
            requestAnimationFrame(animate)
          } else if (allFinished) {
            simulatedHorses.forEach((horse) => {
              commit('UPDATE_HORSE_POSITION', {
                roundIndex: state.currentRoundIndex,
                horseId: horse.id,
                position: PROGRESS_COMPLETE,
              })
            })
            resolve()
          } else {
            resolve()
          }
        }

        requestAnimationFrame(animate)
      })
    },

    pauseRace({ commit }) {
      commit('PAUSE_RACE')
    },
  },
})
