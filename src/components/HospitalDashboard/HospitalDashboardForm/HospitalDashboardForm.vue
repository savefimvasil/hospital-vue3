<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHospitalStore } from '@/stores/hospital'
import BaseForm from '@/components/base/BaseForm/BaseForm.vue'
import { useBaseDynamicForm } from '@/composables/useBaseDynamicForm'
import type { IFilter } from '@/models/base/filter'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import { FilterTypes } from '@/models/enums/filterTypes'
import { storeToRefs } from 'pinia'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'

const { getHospital, getSetOfFilters } = storeToRefs(useHospitalStore())

const $emit = defineEmits(['onSubmit'])

const props = defineProps<{ initialValues?: IHospitalInventoryItem, mode: 'add' | 'edit' }>()

const { generateFormData, formData, clearFields } = useBaseDynamicForm()

onMounted(() => {
  if (getSetOfFilters.value) {
    generateFormData(getSetOfFilters.value as IFilter[], props.initialValues)
  }
})

const onSubmit = () => {
  $emit('onSubmit', formData.value)
  clearFields()
}
</script>

<template>
  <div class="hospital-dashboard-add">
    <template v-if="getHospital">
      <base-form
        class="hospital-dashboard-add__form"
        @mounted="generateFormData"
      >
        <div
          v-for="(filter, index) in getSetOfFilters as IFilter[]"
          :key="index"
        >
          <base-input
            v-if="formData"
            v-model:input="formData[filter.name]"
            :name="filter.name"
            :value="formData[filter.name]"
            :placeholder="filter.name"
            :label="filter.name"
            :type="filter.type === FilterTypes.number ? 'number' : undefined"
          />
        </div>

        <div
          v-if="formData"
          class="hospital-dashboard-add__add"
        >
          <base-button
            type="submit"
            :disabled="Object.values(formData).filter((value) => value).length !== Object.keys(formData).length"
            @click.prevent="onSubmit"
          >
            submit
          </base-button>
        </div>
      </base-form>
    </template>
  </div>
</template>

<style scoped lang="postcss">
.hospital-dashboard-add {
  &__form {
    @apply grid grid-cols-4 gap-2;
  }

  &__add {
    @apply flex items-end;

    button {
      @apply w-full h-9;
    }
  }
}
</style>
