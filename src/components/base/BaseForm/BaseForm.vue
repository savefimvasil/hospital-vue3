<script setup lang='ts'>
import { onMounted, ref } from 'vue'

const $emit = defineEmits(['mounted'])
const error = ref<Error>()
const showError = (errorInstance: Error) => {
  error.value = errorInstance
}

const clearError = () => {
  error.value = undefined
}

defineExpose({
  showError, clearError
});

onMounted(() => {
  $emit('mounted')
})
</script>

<template>
  <form class="base-form">
    <slot />

    <p class="base-form__error">
      {{ error }}
    </p>
  </form>
</template>

<style scoped lang='postcss'>
.base-form {
  &__error {
    @apply font-light text-red-500 text-sm mt-1;
  }
}
</style>
