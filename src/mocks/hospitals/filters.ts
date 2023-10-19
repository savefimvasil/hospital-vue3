import { FilterTypes } from '@/models/enums/filterTypes'
import type { IFilter } from '@/models/base/filter'

export const mockFilters: IFilter[] = [
  {
    id: 1,
    name: 'productName',
    type: FilterTypes.input
  },
  {
    id: 2,
    name: 'itemNumber',
    type: FilterTypes.input
  },
  {
    id: 3,
    name: 'manufacturer',
    type: FilterTypes.input
  },
  {
    id: 4,
    name: 'category',
    type: FilterTypes.dropdown
  },
  {
    id: 5,
    name: 'price',
    type: FilterTypes.number
  },
  {
    id: 6,
    name: 'expireDate',
    type: FilterTypes.input
  },
  {
    id: 7,
    name: 'quantity',
    type: FilterTypes.number
  },

]
