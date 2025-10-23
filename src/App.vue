<script setup lang="ts">
import ControlPanel from './components/ControlPanel.vue'
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import RaceSchedule from './components/RaceSchedule.vue'
import RaceResults from './components/RaceResults.vue'
import './styles/main.scss'
</script>

<template>
  <div class="app-container">
    <ControlPanel />
    <div class="main-content">
      <aside class="sidebar left">
        <HorseList />
      </aside>
      <main class="track-area">
        <RaceTrack />
      </main>
      <aside class="sidebar right">
        <div class="right-panels">
          <RaceSchedule />
          <RaceResults />
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles/variables.scss';

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: grid;
  grid-template-columns: $sidebar-left-width 1fr $sidebar-right-width;
  gap: $spacing-md;
  padding: $spacing-md;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  overflow: hidden;

  &.left {
    min-width: $sidebar-left-width;
  }

  &.right {
    min-width: $sidebar-right-width;
  }
}

.track-area {
  overflow: hidden;
}

.right-panels {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: $spacing-md;
  height: 100%;

  > * {
    overflow: hidden;
  }
}

@media (max-width: $breakpoint-xl) {
  .main-content {
    grid-template-columns: $sidebar-left-width-md 1fr $sidebar-right-width-md;
  }

  .sidebar {
    &.left {
      min-width: $sidebar-left-width-md;
    }

    &.right {
      min-width: $sidebar-right-width-md;
    }
  }
}

@media (max-width: $breakpoint-lg) {
  .main-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    overflow-y: auto;
  }

  .sidebar {
    &.left,
    &.right {
      min-width: unset;
      max-height: 300px;
      overflow-y: auto;
    }
  }

  .track-area {
    min-height: 500px;
    overflow-y: auto;
  }

  .right-panels {
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-sm;
    max-height: 500px;
  }
}
</style>
