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
  overflow-y: auto;

  &.left {
    min-width: $sidebar-left-width;
  }

  &.right {
    min-width: $sidebar-right-width;
    overflow: hidden;
  }
}

.track-area {
  overflow-y: auto;
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
  .app-container {
    height: auto;
    min-height: 100vh;
  }

  .main-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    overflow-y: visible;
    overflow: visible;
  }

  .sidebar {
    &.left,
    &.right {
      min-width: unset;
      max-height: none;
      overflow: visible;
      height: auto;
    }
  }

  .track-area {
    min-height: 400px;
    height: auto;
    overflow: visible;
  }

  .right-panels {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    height: auto;
  }
}
</style>
