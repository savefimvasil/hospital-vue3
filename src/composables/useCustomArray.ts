import { SortTypes, SortTypes as SortTypesType } from '@/models/enums/sortTypes'

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

  return {
    sortByField
  }
}
