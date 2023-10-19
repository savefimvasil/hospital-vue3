import { defineStore } from 'pinia'
import type { IHospital } from '@/models/hospital/Hospital'
import { Hospital } from '@/models/hospital/Hospital'
import { computed, ref, type Ref } from 'vue'
import { mockHospitals } from '@/mocks/hospitals/hospitals'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import { mockInventories } from '@/mocks/hospitals/inventory'
import { FilterTypes } from '@/models/enums/filterTypes'
import type { SortTypes as SortTypesType } from '@/models/enums/sortTypes'
import { SortTypes } from '@/models/enums/sortTypes'

export const useHospitalStore = defineStore('hospitalStore', () => {
  const hospital: Ref<Hospital | undefined> = ref(undefined)
  const selectedFilters: Ref<{ [key: string]: string }> = ref({})
  const selectedSort: Ref<{ [key: string]: string }> = ref({})
  const hospitalInventoryToShow: Ref<IHospitalInventoryItem[]> = ref([])

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
    function sortByField(
      arr: IHospitalInventoryItem[],
      field: keyof IHospitalInventoryItem,
      order: SortTypesType = SortTypes.asc
    ) {
      return arr.slice().sort((a: any, b: any) => {
        let comparison
        if (typeof a[field] === 'number') {
          comparison = +a[field] - +b[field]
        } else {
          comparison = a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
        }
        return order === 'desc' ? comparison * -1 : comparison
      })
    }

    if (getInventory?.value) {
      let inventoryToFilter = [...(getInventory?.value?.items as IHospitalInventoryItem[])]

      // filter
      Object.keys(selectedFilters.value).forEach((key) => {
        inventoryToFilter = inventoryToFilter.filter((item) => {
          if (item[key as keyof IHospitalInventoryItem]) {
            const currentFilterObject = getSetOfFilters?.value?.find((item) => item.name === key)

            if ([FilterTypes.input, FilterTypes.number].includes(currentFilterObject?.type as FilterTypes)) {
              return String(item[key as keyof IHospitalInventoryItem]).includes(
                selectedFilters.value[key]
              )
            } else if (currentFilterObject?.type === FilterTypes.dropdown) {
              if (selectedFilters.value[key]) {
                return (
                  String(item[key as keyof IHospitalInventoryItem]) === selectedFilters.value[key]
                )
              }
            }

            return true
          }
        })
      })

      hospitalInventoryToShow.value = inventoryToFilter

      //sort
      if (Object.values(selectedSort.value).length && Object.values(selectedSort.value)[0]) {
        hospitalInventoryToShow.value = sortByField(
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