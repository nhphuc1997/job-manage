<template>
  <div class="job-section">
    <div class="create">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-input v-model="input1" placeholder="Tìm kiếm" :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="9">
          <el-date-picker v-model="value1" type="daterange" range-separator="Đến" start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc" style="width: 95%;" />
        </el-col>

        <el-col :span="6">
          <el-select v-model="value" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
              :disabled="item.disabled" />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button @click="dialogFormVisible = true" plain style="width: 100%;" type="success"
            :icon="ElIconWindPower">Tạo công việc</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="infor">
      <el-scrollbar height="calc(100% - 100px)">
        <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%" :border="true">
          <el-table-column prop="date" label="Date" sortable column-key="date" />

          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" :formatter="formatter" />

          <el-table-column prop="tag" label="Tag" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" width="200">
            <template #default="scope">
              <el-button :icon="ElIconEditPen" size="small" @click="handleEdit(scope.$index, scope.row)">
                Chỉnh sửa
              </el-button>
              <el-button :icon="ElIconDelete" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                Xoá
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>

    <div class="footer">
      <el-row>
        <el-col :span="24">
          <div class="paginate">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
              :page-sizes="[100, 200, 300, 400]" :small="small" layout="total, sizes, prev, pager, next, jumper"
              :total="400" />
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Khởi tạo công việc" width="500">
      <el-form :model="form">
        <el-form-item label="Tên công việc" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="Tên công việc" />
        </el-form-item>
        <el-form-item label="Khu vực" :label-width="formLabelWidth">
          <el-select v-model="form.areaId" placeholder="Khu vực">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
          <el-date-picker style="width: 100%;" v-model="form.expiredDate" type="date" placeholder="Ngày hết hạn" />
        </el-form-item>

        <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
          <el-input v-model="form.summary" style="width: 100%" :rows="2" type="textarea"
            placeholder="Tóm tắt công việc" />
        </el-form-item>
        <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
          <el-input v-model="form.description" style="width: 100%" :rows="2" type="textarea"
            placeholder="Mô tả công việc" />
        </el-form-item>
        <el-form-item label="Nội dung html" :label-width="formLabelWidth">
          <el-input v-model="form.htmlContent" style="width: 100%" :rows="2" type="textarea"
            placeholder="Mô tả công việc" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Huỷ</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Tạo mới
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

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

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  title: '',
  summary: '',
  description: '',
  htmlContent: '',
  imageUrl: '',
  areaId: '',
  expiredDate: '',
})
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const input1 = ref('')
const value1 = ref('')
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

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

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

</script>
