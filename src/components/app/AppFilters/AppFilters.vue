<template>
  <div
    class="flex flex-row justify-center mb-10"
    data-test="app-filters"
  >
    <button
      v-for="(filter, index) in items"
      :key="index"
      @click="changeFilter(filter)"
    >
      {{ filter }} <template v-if="counts">
        ({{ counts[filter] }})
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

interface IDiscoverCardDetailsFiltersProps {
  items: string[]
  active: string
  counts?: {
    [key: string]: number
  }
}

const props = defineProps<IDiscoverCardDetailsFiltersProps>()

const $emit = defineEmits(['change'])

const selectedFilter: Ref<string> = ref(props.items[0])

onMounted(() => {
  changeFilter(props.active)
})
const changeFilter = (value: string) => {
  selectedFilter.value = value
  $emit('change', value)
}
</script>

<style scoped lang="postcss"></style>
