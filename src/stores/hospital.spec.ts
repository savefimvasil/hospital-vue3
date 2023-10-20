import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useHospitalStore } from '@/stores/hospital'
import { SortTypes } from '@/models/enums/sortTypes'

describe('Hospital store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('check hospitalID and inventory length with mocks', async () => {
    const store = useHospitalStore()

    const { setHospital } = store
    const { getInventory, getHospital } = storeToRefs(store)

    const data = await setHospital(0)
    expect(getHospital.value).toBe(undefined)
    expect((data as Error)?.message).toBe('Request failed')

    await setHospital(1)
    expect(getHospital.value?.getId()).toBe(1)
    // second hospital has 1 inventory items
    expect(getInventory?.value?.getItems().length).toBe(5)

    await setHospital(2)
    expect(getHospital.value?.getId()).toBe(2)
    // second hospital has 2 inventory items
    expect(getInventory?.value?.getItems().length).toBe(2)
  })

  it('check count of filters', async () => {
    const store = useHospitalStore()

    const { setHospital } = store
    const { getSetOfFilters } = storeToRefs(store)

    await setHospital(1)
    // first hospital has 7 filters
    expect(getSetOfFilters.value?.length).toBe(7)

    await setHospital(2)
    // second hospital has 5 filters
    expect(getSetOfFilters.value?.length).toBe(5)
  })

  it('check clearHospital', async () => {
    const store = useHospitalStore()

    const { setHospital, clearHospital } = store
    const { getHospital } = storeToRefs(store)

    await setHospital(1)
    expect(getHospital.value?.getId()).toBe(1)
    clearHospital()
    expect(getHospital.value).toBe(undefined)
  })

  it('check filters', async () => {
    const store = useHospitalStore()

    const { setHospital, setFilters } = store
    const { getFilteredInventory } = storeToRefs(store)

    await setHospital(1)
    setFilters({ productName: '' })
    expect(getFilteredInventory.value.length).toBe(5)

    setFilters({ productName: 'product 1' })
    expect(getFilteredInventory.value.length).toBe(1)

    setFilters({ productName: 'unknown product' })
    expect(getFilteredInventory.value.length).toBe(0)

    setFilters({ category: 'string' })
    expect(getFilteredInventory.value.length).toBe(2)
  })

  it('check sort', async () => {
    const store = useHospitalStore()

    const { setHospital, setSort } = store
    const { getFilteredInventory } = storeToRefs(store)

    await setHospital(1)
    setSort({ price: SortTypes.desc })
    expect(getFilteredInventory.value[0].id).toBe(4)

    setSort({ price: SortTypes.asc })
    expect(getFilteredInventory.value[0].id).toBe(1)

    setSort({ quantity: SortTypes.asc })
    expect(getFilteredInventory.value[0].id).toBe(1)

    setSort({ manufacturer: SortTypes.desc })
    expect(getFilteredInventory.value[0].id).toBe(3)
  })
})
