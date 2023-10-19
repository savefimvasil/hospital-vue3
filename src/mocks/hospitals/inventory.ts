import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'

export const mockInventories: { [key: number]: IHospitalInventoryItem[] } = {
  1: [
    {
      id: 1,
      productName: 'product 1',
      itemNumber: 1,
      manufacturer: 'string',
      category: 'string',
      quantity: 2,
      price: 22,
      expireDate: 'string'
    },
    {
      id: 2,
      productName: 'product 2',
      itemNumber: 1,
      manufacturer: 'string',
      category: 'string',
      quantity: 2,
      price: 22,
      expireDate: 'string'
    },
    {
      id: 3,
      productName: 'product 3',
      itemNumber: 12,
      manufacturer: 'string1',
      category: 'string1',
      quantity: 22,
      price: 222,
      expireDate: 'string1'
    },
    {
      id: 4,
      productName: 'product 4',
      itemNumber: 12,
      manufacturer: 'string1',
      category: 'string1',
      quantity: 21,
      price: 1111,
      expireDate: 'string1'
    },
    {
      id: 5,
      productName: 'product 5',
      itemNumber: 12,
      manufacturer: 'string1',
      category: 'string1',
      quantity: 21,
      price: 222,
      expireDate: 'string1'
    }
  ],
  2: [
    {
      id: 1,
      productName: 'string',
      itemNumber: 1,
      manufacturer: 'string',
      category: 'string',
      quantity: 2,
    },
    {
      id: 2,
      productName: 'string1',
      itemNumber: 12,
      manufacturer: 'string1',
      category: 'string1',
      quantity: 21,
    }
  ]
}
