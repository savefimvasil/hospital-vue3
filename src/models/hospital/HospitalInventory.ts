export interface IHospitalInventoryItem {
  id: number,
  productName: string,
  itemNumber: number,
  manufacturer: string,
  category: string,
  quantity: number,
  price?: number,
  expireDate?: string
}

export class HospitalInventory {
  items: IHospitalInventoryItem[];

  constructor(items: IHospitalInventoryItem[]) {
    this.items = items
  }

  getItems(): IHospitalInventoryItem[] {
    return this.items
  }
  addItem(item: IHospitalInventoryItem) {
    const maxId = Math.max(...this.items.map(item => item.id))
    this.items.push({ ...item, id: maxId + 1 });
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id)
  }

  editItem(item: IHospitalInventoryItem) {
    const index = this.items.findIndex(itemToEdit => itemToEdit.id === item.id)

    this.items[index] = item
  }
}
