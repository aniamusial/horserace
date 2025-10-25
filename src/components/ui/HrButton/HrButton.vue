<template>
  <button
    class="hr-button"
    :class="`hr-button--${variant}`"
    :type="type"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { HrButtonType, HrButtonVariant } from './typings'

withDefaults(
  defineProps<{
    variant?: HrButtonVariant
    type?: HrButtonType
  }>(),
  {
    variant: HrButtonVariant.PRIMARY,
    type: HrButtonType.BUTTON,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.hr-button {
  padding: 0.75rem 1.5rem;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  transition: all $transition-base;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition:
      width 0.6s,
      height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }

  &--primary {
    background: $white;
    color: #667eea;
    box-shadow: $shadow-md;

    &:hover {
      background: $gray-50;
      transform: translateY(-2px);
      box-shadow: $shadow-xl;
    }

    &:active {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: $success;
    color: $white;
    box-shadow: $shadow-md;

    &:hover {
      background: $success-dark;
      transform: translateY(-2px);
      box-shadow: $shadow-xl;
    }

    &:active {
      transform: translateY(0);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
