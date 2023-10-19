<script setup lang="ts">
import { User } from '@/models/auth/User'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useHospitalStore } from '@/stores/hospital'
import HospitalDashboardFilters from '@/components/HospitalDashboard/HospitalDasboardFilters/HospitalDashboardFilters.vue'
import HospitalDashboard from '@/components/HospitalDashboard/HospitalDashboardTable.vue'
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import type { IFilter } from '@/models/base/filter'
import { storeToRefs } from 'pinia'
import HospitalDashboardForm from '@/components/HospitalDashboard/HospitalDashboardForm/HospitalDashboardForm.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'

const { getUser } = useUserStore()
const { setHospital, setFilters, setSort } = useHospitalStore()
const { getSetOfFilters } = storeToRefs(useHospitalStore())

const isAddToggled = ref<boolean>(true)
const isEditToggled = ref<boolean>(false)
const itemToEdit = ref<IHospitalInventoryItem | null>(null)

const { getFilteredInventory, getHospital, getInventory } = storeToRefs(useHospitalStore())

onMounted(async () => {
  if (getUser()?.hospitalId) await setHospital((getUser() as User).hospitalId)
})

const onFilter = (filters: { [key: string]: string }) => {
  setFilters(filters)
}

const onSort = (sort: { [key: string]: string }) => {
  setSort(sort)
}

const addInventoryItem = (item: IHospitalInventoryItem) => {
  getInventory?.value?.addItem({ ...item })
  isAddToggled.value = !isAddToggled.value
  getHospital.value?.regenerateFilters()
}

const deleteInventoryItem = (id: number) => {
  getInventory?.value?.deleteItem(id)
  getHospital.value?.regenerateFilters()
}

const startEditInventoryItem = (item: IHospitalInventoryItem) => {
  isEditToggled.value = true
  itemToEdit.value = item
}

const submitEditInventoryItem = (item: IHospitalInventoryItem) => {
  getInventory?.value?.editItem({ ...itemToEdit.value, ...item})
  isEditToggled.value = !isEditToggled.value
  getHospital.value?.regenerateFilters()
}
</script>

<template>
  <div
    v-if="getHospital"
    class="dashboard"
  >
    <div class="container">
      <h1>Dashboard</h1>
      <hospital-dashboard-filters @on-filter="onFilter" />
      <div class="dashboard__add">
        <base-button @click="isAddToggled = !isAddToggled">
          {{ isAddToggled ? 'add new item' : 'cancel' }}
        </base-button>
        <hospital-dashboard-form
          v-if="!isAddToggled"
          mode="add"
          @on-submit="addInventoryItem"
        />
      </div>

      <div
        v-if="isEditToggled && itemToEdit"
        class="dashboard__edit"
      >
        <base-button @click="isEditToggled = !isEditToggled">
          cancel edit
        </base-button>
        <hospital-dashboard-form
          mode="edit"
          :initial-values="itemToEdit"
          @on-submit="submitEditInventoryItem"
        />
      </div>
      <hospital-dashboard
        class="dashboard__table"
        :data="getFilteredInventory"
        :filters="getSetOfFilters as IFilter[]"
        @on-delete="deleteInventoryItem"
        @on-sort="onSort"
        @on-edit="startEditInventoryItem"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.dashboard {
  &__table {
    @apply mt-6;
  }

  &__add,
  &__edit {
    @apply mt-6;
  }
}
</style>
