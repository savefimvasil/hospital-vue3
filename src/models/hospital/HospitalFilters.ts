import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import { mockFilters } from '@/mocks/hospitals/filters'
import { FilterTypes } from '@/models/enums/filterTypes'
import type { IDropdownValue } from '@/models/base/forms'
import type { IFilter } from '@/models/base/filter'

export class HospitalFilters {
  private filters: IFilter[] = [];

  constructor(inventoryItems: IHospitalInventoryItem[]) {
    this.generateFilters(inventoryItems)
  }

  generateFilters(inventoryItems: IHospitalInventoryItem[]) {
    this.filters = Object.keys(inventoryItems[0]).map(item => mockFilters.find(filter => {
      return filter.name === item
    })).filter(item => item) as IFilter[]

    // get all dropdown values
    this.filters.forEach(filter => {
      if (filter?.type === FilterTypes.dropdown) {
        let filterValues: IDropdownValue[] = []
        inventoryItems.forEach(item => {
          if (!filterValues.find(itemFind => itemFind.value === item[filter.name  as keyof IHospitalInventoryItem])) {
            filterValues = [
              ...filterValues,
              {
                label: item[filter.name as keyof IHospitalInventoryItem] as string,
                value: item[filter.name as keyof IHospitalInventoryItem] as string
              }
            ]
          }
        })

        filter.values = filterValues
      }
    })
  }
  getFilters() {
    return this.filters;
  }
}
