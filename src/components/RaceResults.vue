<template>
  <HrPanel
    :is-empty="completedRaces.length === 0"
    placeholder="No results yet. Start a race to see results!"
  >
    <template #header>Results</template>
    <div class="race-results__list">
      <HrLapCard
        v-for="race in completedRaces"
        :key="`result-${race.roundNumber}`"
        :title="`${getRoundLabel(race.roundNumber)} Lap - ${race.distance}m`"
        :rows="getRaceResultsRows(race)"
        is-completed
      />
    </div>
  </HrPanel>
</template>

<script setup lang="ts">
import { getRoundLabel } from '@/utils/formatters'
import { useGameState } from '@/composables/useGameState'
import HrPanel from '@/components/ui/HrPanel/HrPanel.vue'
import HrLapCard from '@/components/ui/HrLapCard/HrLapCard.vue'
import type { Race, RaceResult } from '@/types'

const { completedRaces } = useGameState()

const getRaceResultsRows = (race: Race) => {
  return (
    race.results?.map((result: RaceResult) => ({
      id: result.horseId,
      position: result.position,
      name: result.horseName,
    })) || []
  )
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.race-results__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
