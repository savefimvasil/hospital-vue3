import { HospitalFilters } from '@/models/hospital/HospitalFilters'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import { HospitalInventory } from '@/models/hospital/HospitalInventory'

export interface IHospital {
  id: number
  name: string
  filters?: HospitalFilters;
  inventory?: HospitalInventory;
}

export class Hospital {
  private id: number;
  private name: string;
  private filters: HospitalFilters;
  inventory: HospitalInventory;

  constructor(id: number, name: string, inventory: IHospitalInventoryItem[]) {
    this.id = id;
    this.name = name;
    this.inventory = new HospitalInventory(inventory)
    this.filters = new HospitalFilters(this.inventory.getItems())
  }

  getId() {
    return this.id
  }

  getFilters() {
    return this.filters.getFilters()
  }

  getInventory() {
    return this.inventory.getItems()
  }

  regenerateFilters() {
    this.filters.generateFilters(this.inventory.getItems())
  }
}
