import { defineStore } from 'pinia'
import type { IHospital } from '@/models/hospital/Hospital'
import { Hospital } from '@/models/hospital/Hospital'
import { computed, ref, type Ref } from 'vue'
import { mockHospitals } from '@/mocks/hospitals/hospitals'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import { mockInventories } from '@/mocks/hospitals/inventory'
import { SortTypes } from '@/models/enums/sortTypes'
import { useCustomArray } from '@/composables/useCustomArray'

export const useHospitalStore = defineStore('hospitalStore', () => {
  const hospital: Ref<Hospital | undefined> = ref(undefined)
  const selectedFilters: Ref<{ [key: string]: string }> = ref({})
  const selectedSort: Ref<{ [key: string]: string }> = ref({})
  const hospitalInventoryToShow: Ref<IHospitalInventoryItem[]> = ref([])

  const { sortByField, filterByFields } = useCustomArray()

  const clearHospital = () => {
    hospital.value = undefined
  }
  const setHospital = async (hospitalId: number) => {
    // here should be request for hospitalData, I made mock
    try {
      const currentHospital = await getHospitalData(hospitalId)

      if (currentHospital) {
        // here should be 'await' and call method getInventory
        const currentInventory: IHospitalInventoryItem[] = await getInventoryByHospitalId(hospitalId)

        hospital.value = new Hospital(hospitalId, currentHospital.name, currentInventory)
      }
    } catch (e) {
      console.log('eeee', e)
      return e
    }
  }

  const getHospital = computed(() => {
    return hospital.value
  })

  const getSetOfFilters = computed(() => {
    return hospital.value?.getFilters()
  })

  const setFilters = (filters: { [key: string]: string }) => {
    selectedFilters.value = filters
  }

  const setSort = (sort: { [key: string]: string }) => {
    selectedSort.value = sort
  }

  const getHospitalData = async (hospitalId: number): Promise<IHospital | undefined> => {
    const success = mockHospitals.find((item: IHospital) => item.id === hospitalId)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          return resolve(success)
        } else {
          return reject(new Error('Request failed'))
        }
      }, 200)
    })
  }

  // should be async method to get Inventory by id
  const getInventoryByHospitalId = async (hospitalId: number): Promise<IHospitalInventoryItem[]> => {
    const success = mockInventories[hospitalId]
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          return resolve(success)
        } else {
          return reject(new Error('Request failed'))
        }
      }, 200)
    })
  }

  const getInventory = computed(() => {
    return hospital.value?.inventory
  })

  const getFilteredInventory = computed((): IHospitalInventoryItem[] => {
    if (getInventory?.value) {
      const inventoryToFilter = [...(getInventory?.value?.items as IHospitalInventoryItem[])]

      // filter
      hospitalInventoryToShow.value = filterByFields<IHospitalInventoryItem>(
        (getInventory?.value?.items as IHospitalInventoryItem[]),
        selectedFilters?.value,
        getSetOfFilters?.value
      )

      //sort
      if (Object.values(selectedSort.value).length && Object.values(selectedSort.value)[0]) {
        hospitalInventoryToShow.value = sortByField<IHospitalInventoryItem>(
          inventoryToFilter,
          Object.keys(selectedSort.value)[0] as keyof IHospitalInventoryItem,
          Object.values(selectedSort.value)[0] as SortTypes || SortTypes.none
        )
      }
    }
    return hospitalInventoryToShow.value
  })

  return {
    setHospital,
    clearHospital,
    getHospital,
    getInventory,
    getFilteredInventory,
    setFilters,
    setSort,
    selectedSort,
    getSetOfFilters
  }
})
