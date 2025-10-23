<template>
  <div class="hr-panel">
    <div class="hr-panel__header">
      <h2 class="hr-panel__title">
        <slot name="header" />
      </h2>
    </div>
    <div class="hr-panel__content">
      <div v-if="isEmpty && placeholder" class="hr-panel__placeholder">
        <p>{{ placeholder }}</p>
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string
  isEmpty?: boolean
}

withDefaults(defineProps<Props>(), {
  placeholder: undefined,
  isEmpty: false,
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.hr-panel {
  background: $white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-lg;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    padding: $spacing-md;
    background: $secondary;
  }

  &__title {
    margin: 0;
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $white;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-md;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: $gray-600;
    font-style: italic;
    text-align: center;

    p {
      margin: 0;
    }
  }
}
</style>
