import { FilterTypes } from '@/models/enums/filterTypes'
import BaseInput from '@/components/base/BaseInput/BaseInput.vue'
import BaseDropdown from '@/components/base/BaseDropdown/BaseDropdown.vue'
import type { IFilter } from '@/models/base/filter'
import { ref, type Ref } from 'vue'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'

export const useBaseDynamicForm = () => {
  const formData = ref<{ [key: string]: string | number | undefined }>()

  const getElement = (type: FilterTypes) => {
    switch (type) {
      case FilterTypes.input:
        return BaseInput
      case FilterTypes.dropdown:
        return BaseDropdown
      default:
        return BaseInput
    }
  }

  const generateFormData = (filters: IFilter[], initialValues?: IHospitalInventoryItem) => {
    if (filters) {
      filters.forEach(item => {
        if (initialValues && initialValues[item.name as keyof IHospitalInventoryItem]) {
          formData.value = { ...formData.value, [item.name]: initialValues[item.name as keyof IHospitalInventoryItem] }
        } else {
          formData.value = { ...formData.value, [item.name]: '' }
        }
      })
    }
  }

  const clearFields = () => {
    if (formData.value) {
      Object.keys(formData.value).forEach(k => (formData.value as { [key: string]: string })[k] = '')
    }
  }

  return {
    getElement,
    generateFormData,
    formData,
    clearFields
  }
}
