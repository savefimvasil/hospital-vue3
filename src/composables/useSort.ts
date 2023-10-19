import { ref } from 'vue'
import { SortTypes } from '@/models/enums/sortTypes'

export const useSort = () => {
  const sortData = ref<{ [key: string]: string }>()

  const toggleSort = (key: string) => {
    if (sortData.value && sortData.value[key]) {
      if (sortData.value[key] === SortTypes.asc) {
        sortData.value[key] = SortTypes.desc
      } else if (sortData.value[key] === SortTypes.desc) {
        sortData.value[key] = SortTypes.none
      }
    } else {
      sortData.value = { [key]: SortTypes.asc }
    }

    return sortData.value
  }

  return {
    sortData,
    toggleSort
  }
}
