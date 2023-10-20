import { SortTypes, SortTypes as SortTypesType } from '@/models/enums/sortTypes'
import { FilterTypes } from '@/models/enums/filterTypes'
import type { IFilter } from '@/models/base/filter'

export const useCustomArray = () => {
  const sortByField = <Type>(
    arr: Type[],
    field: keyof Type,
    order: SortTypesType = SortTypes.asc
  ) => {
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

  const filterByFields = <Type>(arr: Type[], selectedFilters: { [key: string]: string }, setOfFilters: IFilter[] | undefined) => {
    let inventoryToFilter = [...arr as Type[]]

    // filter
    Object.keys(selectedFilters).forEach((key) => {
      inventoryToFilter = inventoryToFilter.filter((item) => {
        if (item[key as keyof Type]) {
          const currentFilterObject = setOfFilters?.find((item) => item.name === key)

          if ([FilterTypes.input, FilterTypes.number].includes(currentFilterObject?.type as FilterTypes)) {
            return String(item[key as keyof Type]).includes(
              selectedFilters[key]
            )
          } else if (currentFilterObject?.type === FilterTypes.dropdown) {
            if (selectedFilters[key]) {
              return (
                String(item[key as keyof Type]) === selectedFilters[key]
              )
            }
          }

          return true
        }
      })
    })

    return inventoryToFilter
  }

  return {
    sortByField,
    filterByFields
  }
}
