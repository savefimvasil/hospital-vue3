<script setup lang='ts'>
import type { IDropdownValue } from '@/models/base/forms'

interface IProps {
  placeholder: string
  name: string
  label: string
  values: IDropdownValue[]
}

defineProps<IProps>()

const $emit = defineEmits(['update:input'])

const onInput = (e: any) => {
  $emit('update:input', e.target.value)
}
</script>

<template>
  <div class="base-dropdown">
    <label
      class="base-dropdown__label"
      :for="name"
    >{{ label }}</label>
    <select
      class="base-dropdown__input"
      :name="name"
      @input="onInput"
    >
      <option value="">
        please select value
      </option>
      <option
        v-for="(item, index) in values"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang='postcss'>
.base-dropdown {
  @apply flex flex-col mt-2;

  &__label {
    @apply text-xs;
  }

  &__input {
    @apply py-1 px-2 border-2 border-b-gray-300 outline-0 rounded focus:outline-1 h-9;
  }
}
</style>
