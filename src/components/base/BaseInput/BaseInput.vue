<script setup lang='ts'>
import { onMounted } from 'vue'

interface IProps {
  placeholder: string
  name: string
  label: string
  type?: string
  value: string | number | undefined,
}

const { value } = defineProps<IProps>()

const $emit = defineEmits(['update:input'])

const onInput = (e: any) => {
  $emit('update:input', e?.target?.value)
}

onMounted(() => {
  if (value) {
    $emit('update:input', value)
  }
})
</script>

<template>
  <div class="base-input">
    <label
      class="base-input__label"
      :for="name"
    >{{ label }}</label>
    <input
      class="base-input__input"
      :placeholder="placeholder"
      :value="String(value)"
      :name="name"
      :type="type ? type : undefined"
      @input="onInput"
    />
  </div>
</template>

<style scoped lang='postcss'>
.base-input {
  @apply flex flex-col mt-2;

  &__label {
    @apply text-xs;
  }

  &__input {
    @apply py-1 px-2 border-2 border-b-gray-300 outline-0 rounded focus:outline-1;
  }
}
</style>
