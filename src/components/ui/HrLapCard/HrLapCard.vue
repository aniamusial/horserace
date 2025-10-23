<template>
  <div
    class="hr-lap-card"
    :class="{ 'hr-lap-card--active': isActive, 'hr-lap-card--completed': isCompleted }"
  >
    <div class="hr-lap-card__header">
      <strong>{{ title }}</strong>
    </div>
    <table class="hr-lap-card__table">
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.position }}</td>
          <td>{{ row.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface LapCardRow {
  id: number
  position: number
  name: string
}

interface Props {
  title: string
  rows: LapCardRow[]
  isActive?: boolean
  isCompleted?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
  isCompleted: false,
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.hr-lap-card {
  border: 2px solid $gray-200;
  border-radius: $border-radius-md;
  overflow: hidden;
  transition: all $transition-base;

  &--active {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &--completed {
    opacity: 0.7;
    background: $gray-50;
  }

  &__header {
    background: $danger;
    color: $white;
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-base;
  }

  .hr-lap-card--active &__header {
    background: $primary;
  }

  .hr-lap-card--completed &__header {
    background: $gray-500;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background: $gray-50;
    }

    th {
      padding: $spacing-sm $spacing-md;
      text-align: left;
      font-size: $font-size-xs;
      font-weight: $font-weight-semibold;
      color: $gray-700;
      border-bottom: 1px solid $gray-300;
    }

    td {
      padding: $spacing-xs $spacing-md;
      font-size: $font-size-sm;
      border-bottom: 1px solid $gray-100;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover {
      background: $gray-50;
    }

    .hr-lap-card--completed & tbody tr:nth-child(1) {
      background: rgba(255, 215, 0, 0.1);
      font-weight: $font-weight-semibold;
    }

    .hr-lap-card--completed & tbody tr:nth-child(2) {
      background: rgba(192, 192, 192, 0.1);
      font-weight: $font-weight-medium;
    }

    .hr-lap-card--completed & tbody tr:nth-child(3) {
      background: rgba(205, 127, 50, 0.1);
      font-weight: $font-weight-medium;
    }
  }
}
</style>
