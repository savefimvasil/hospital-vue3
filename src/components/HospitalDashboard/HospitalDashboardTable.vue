<script setup lang='ts'>
import type { IHospitalInventoryItem } from '@/models/hospital/HospitalInventory'
import type { IFilter } from '@/models/base/filter'
import { useSort } from '@/composables/useSort'
import { useHospitalStore } from '@/stores/hospital'
import { SortTypes } from '@/models/enums/sortTypes'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'

defineProps<{ data: IHospitalInventoryItem[], filters: IFilter[] }>()

const { selectedSort } = storeToRefs(useHospitalStore())

const $emit = defineEmits(['onSort', 'onDelete', 'onEdit'])

const { toggleSort } = useSort()

const onClickHead = (col: string) => {
  const sortObj = toggleSort(col)

  $emit('onSort', sortObj)
}

const onDelete = (id: number) => {
  $emit('onDelete', id)
}

const onEdit = (row: IHospitalInventoryItem) => {
  $emit('onEdit', row)
}
</script>

<template>
  <div class="hospital-dashboard-table">
    <table v-show="data.length">
      <tr>
        <th
          v-for="(filter, index) in filters"
          :key="index"
          @click="onClickHead(filter.name)"
        >
          {{ filter.name }}
          <svg
            v-if="selectedSort[filter.name]"
            :class="{
              'hospital-dashboard-table__arrow--asc': selectedSort[filter.name] === SortTypes.asc,
              'hospital-dashboard-table__arrow--desc': selectedSort[filter.name] === SortTypes.desc
            }"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            class="hospital-dashboard-table__arrow"
          ><path
            style="fill:#232326"
            d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
          /></svg>
        </th>
        <th>actions</th>
      </tr>
      <tr
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
      >
        <td
          v-for="(col, colIndex) in filters"
          :key="colIndex"
        >
          {{ row[col.name as keyof IHospitalInventoryItem] }}
        </td>
        <td>
          <base-button @click="onEdit(row)">
            edit
          </base-button>
          <base-button
            class="ml-3"
            color="red"
            @click="onDelete(row.id)"
          >
            delete
          </base-button>
        </td>
      </tr>
    </table>
    <h3 v-show="!data.length">
      Items not found
    </h3>
  </div>
</template>

<style scoped lang='postcss'>
.hospital-dashboard-table {
  table {
    @apply w-full;
  }

  tr, td, th, table {
    @apply border-solid border border-gray-300;
  }

  th, td {
    @apply p-2;
  }

  th {
    @apply cursor-pointer pr-4 relative text-left;
  }

  &__head {
    @apply flex items-center justify-center;
  }

  &__arrow {
    @apply w-4 h-4 right-3 absolute top-1/2 -translate-y-1/2;

    &--asc {
      @apply -translate-y-1/2 rotate-180;
    }
  }
}
</style>
