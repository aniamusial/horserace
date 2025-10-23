<template>
  <HrPanel :is-empty="raceProgram.length === 0" placeholder="No program generated yet">
    <template #header>Program</template>
    <div class="race-schedule__list">
      <HrLapCard
        v-for="race in raceProgram"
        :key="`schedule-${race.roundNumber}`"
        :title="`${getRoundLabel(race.roundNumber)} Lap - ${race.distance}m`"
        :rows="getRaceScheduleRows(race)"
        :is-active="race.roundNumber === currentRoundIndex + 1"
        :is-completed="race.status === 'completed'"
      />
    </div>
  </HrPanel>
</template>

<script setup lang="ts">
import { getRoundLabel } from '@/utils/formatters'
import { useGameState } from '@/composables/useGameState'
import HrPanel from '@/components/ui/HrPanel/HrPanel.vue'
import HrLapCard from '@/components/ui/HrLapCard/HrLapCard.vue'
import type { Race } from '@/types'

const { raceProgram, currentRoundIndex } = useGameState()

const getRaceScheduleRows = (race: Race) => {
  return race.horses.map((horse, index) => ({
    id: horse.id,
    position: index + 1,
    name: horse.name,
  }))
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.race-schedule {
  &__list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
}
</style>
