<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%" :border="true">
    <el-table-column prop="date" label="Date" sortable column-key="date" :filters="[
      { text: '2016-05-01', value: '2016-05-01' },
      { text: '2016-05-02', value: '2016-05-02' },
      { text: '2016-05-03', value: '2016-05-03' },
      { text: '2016-05-04', value: '2016-05-04' },
    ]" :filter-method="filterHandler" />

    <el-table-column prop="name" label="Name" />
    <el-table-column prop="address" label="Address" :formatter="formatter" />

    <el-table-column prop="tag" label="Tag" width="100" :filters="[
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ]" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column align="center" width="350">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm kiếm" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          Edit
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})

import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  date: string
  name: string
  address: string
  tag: string
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
]

const tableRef = ref<TableInstance>()
const search = ref('')

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address
}

const filterTag = (value: string, row: User) => {
  return row.tag === value
}

const filterHandler = (
  value: string,
  row: any,
  column: TableColumnCtx<User>
) => {
  const property = column['property']
  return row[property] === value
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

</script>
