<template>
  <div class="race-track">
    <div v-if="!currentRace" class="race-track__no-race">
      <p>Generate a program to start racing!</p>
    </div>
    <div v-else class="race-track__track-container">
      <div class="race-track__track-info">
        <h3>{{ getRoundLabel(currentRace.roundNumber) }} Lap - {{ currentRace.distance }}m</h3>
      </div>
      <div class="race-track__lanes">
        <div v-for="(horse, index) in currentRace.horses" :key="horse.id" class="race-track__lane">
          <div class="race-track__lane-number">{{ index + 1 }}</div>
          <div class="race-track__lane-track">
            <div class="race-track__lane-line"></div>
            <div
              class="race-track__horse-icon"
              :class="{ 'race-track__horse-icon--racing': isRacing }"
              :style="{ '--horse-position': `${horse.position || 0}%` }"
            >
              <HorseIcon :color="horse.color" />
            </div>
          </div>
          <div class="race-track__finish-line">FINISH</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoundLabel } from '@/utils/formatters'
import { useGameState } from '@/composables/useGameState'
import HorseIcon from '@/components/assets/HorseIcon.vue'

const { currentRace, isRacing } = useGameState()
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.race-track {
  background: $track-bg;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  padding: $spacing-md;
  height: 100%;
  overflow: hidden;

  &__no-race {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6c4f3d;
    font-size: $font-size-xl;
    font-weight: $font-weight-medium;
  }

  &__track-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__track-info {
    background: #d32f2f;
    color: white;
    padding: $spacing-sm $spacing-md;
    border-radius: $border-radius-md;
    margin-bottom: $spacing-md;
    text-align: center;

    h3 {
      margin: 0;
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
    }
  }

  &__lanes {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }

  &__lane {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    min-height: 50px;
    border-bottom: 2px solid #8b7355;

    &:last-child {
      border-bottom: none;
    }
  }

  &__lane-number {
    width: 40px;
    height: 40px;
    background: $success;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: $font-weight-bold;
    font-size: $font-size-lg;
    border-radius: $border-radius-md;
    flex-shrink: 0;
    box-shadow: $shadow-md;
  }

  &__lane-track {
    flex: 1;
    position: relative;
    height: 100%;
    margin: 0 $spacing-sm;
  }

  &__lane-line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 0;
    border-top: 2px dashed #8b7355;
  }

  &__horse-icon {
    position: absolute;
    top: 50%;
    left: var(--horse-position, 0%);
    transform: translateY(-50%);
    width: 50px;
    height: 30px;
    z-index: 10;

    &--racing {
      transition: left 0.1s linear;
    }

    svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
    }
  }

  &__finish-line {
    width: 60px;
    background: $danger;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: $font-weight-bold;
    font-size: $font-size-sm;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: $spacing-sm 0;
    border-radius: $border-radius-md;
    flex-shrink: 0;
    box-shadow: $shadow-md;
  }
}
</style>
