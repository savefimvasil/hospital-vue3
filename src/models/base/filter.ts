import { FilterTypes } from '@/models/enums/filterTypes'
import type { IDropdownValue } from '@/models/base/forms'

export interface IFilter {
  id: number
  name: string
  type: FilterTypes
  values?: IDropdownValue[]
}
