<script setup lang='ts'>
import { computed, onMounted, watch } from 'vue'
import { useHospitalStore } from '@/stores/hospital'
import BaseForm from '@/components/base/BaseForm/BaseForm.vue'
import { useBaseDynamicForm } from '@/composables/useBaseDynamicForm'
import { FilterTypes } from '@/models/enums/filterTypes'
import type { IFilter } from '@/models/base/filter'
import { storeToRefs } from 'pinia'

const { getHospital, getSetOfFilters } = storeToRefs(useHospitalStore())

const $emit = defineEmits(['onFilter'])

const { getElement, generateFormData, formData } = useBaseDynamicForm()

onMounted(() => {
  if (getSetOfFilters.value) {
    generateFormData(getSetOfFilters.value as IFilter[])
  }
})

watch(formData, () => $emit('onFilter', formData.value), { deep: true })
</script>

<template>
  <div class="hospital-dashboard-filters">
    <template v-if="getHospital">
      <base-form
        class="hospital-dashboard-filters__form"
        @mounted="generateFormData"
      >
        <div
          v-for="(filter, index) in getSetOfFilters as IFilter[]"
          :key="index"
        >
          <component
            :is="getElement(filter.type)"
            v-if="formData"
            v-model:input="formData[filter.name]"
            :value="formData[filter.name]"
            :name="filter.name"
            :placeholder="filter.name"
            :label="filter.name"
            :type="filter.type === FilterTypes.number ? 'number' : undefined"
            :values="filter.type === FilterTypes.dropdown ? filter.values : undefined"
          />
        </div>
      </base-form>
    </template>
  </div>
</template>

<style scoped lang='postcss'>
.hospital-dashboard-filters {
  &__form {
    @apply grid grid-cols-4 gap-2;
  }
}
</style>
