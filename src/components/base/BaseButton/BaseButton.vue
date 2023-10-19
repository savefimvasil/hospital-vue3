<script setup lang='ts'>
interface IProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: 'red' | 'blue'
}

defineProps<IProps>()
</script>

<template>
  <button
    :type="type ? type : undefined"
    :disabled="disabled || false"
    class="base-button"
    :class="[`base-button--${color}`]"
  >
    <slot />
  </button>
</template>

<style scoped lang='postcss'>
.base-button {
  @apply py-1 px-2 bg-blue-600 rounded text-white;

  &:disabled {
    @apply opacity-50;
  }

  &--red {
    @apply bg-red-500
  }
}
</style>
