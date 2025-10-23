<template>
  <HrPanel>
    <template #header>Horse List 1-{{ allHorses.length }}</template>
    <table class="horse-list__horse-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in allHorses" :key="horse.id">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <div class="horse-list__color-indicator">
              <span class="horse-list__color-box" :style="{ backgroundColor: horse.color }"></span>
              <span class="horse-list__color-name">{{ getColorName(horse.color) }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </HrPanel>
</template>

<script setup lang="ts">
import { getColorName } from '@/utils/formatters'
import { useGameState } from '@/composables/useGameState'
import HrPanel from '@/components/ui/HrPanel/HrPanel.vue'

const { allHorses } = useGameState()
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.horse-list {
  &__horse-table {
    width: 100%;
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0;
      background: $gray-50;
      z-index: $z-sticky;
    }

    th {
      padding: $spacing-md;
      text-align: left;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      color: $gray-700;
      border-bottom: 2px solid $gray-300;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    td {
      padding: $spacing-md;
      border-bottom: 1px solid $gray-200;
      font-size: $font-size-base;
    }

    tr:hover {
      background: $gray-50;
    }
  }
  &__color-indicator {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
  &__color-box {
    width: 1.5rem;
    height: 1.5rem;
  }
  &__color-name {
    font-size: $font-size-sm;
    color: $gray-600;
  }
}
</style>
