import { computed } from 'vue'
import { useStore } from 'vuex'
import type { State } from '@/store/types'

export function useGameState() {
  const store = useStore<State>()
  const { getters, state, dispatch } = store

  const canGenerate = computed(() => getters.canGenerate)
  const canStart = computed(() => getters.canStart)
  const isRacing = computed(() => getters.isRacing)
  const isPaused = computed(() => getters.isPaused)
  const currentRace = computed(() => getters.currentRace)

  const allHorses = computed(() => state.allHorses)
  const raceProgram = computed(() => state.raceProgram)
  const currentRoundIndex = computed(() => state.currentRoundIndex)
  const completedRaces = computed(() => state.completedRaces)
  const gameStatus = computed(() => state.gameStatus)

  const generateProgram = () => dispatch('generateProgram')
  const startRace = () => dispatch('startRace')
  const pauseRace = () => dispatch('pauseRace')

  return {
    canGenerate,
    canStart,
    isRacing,
    isPaused,
    currentRace,
    allHorses,
    raceProgram,
    currentRoundIndex,
    completedRaces,
    gameStatus,
    generateProgram,
    startRace,
    pauseRace,
  }
}
