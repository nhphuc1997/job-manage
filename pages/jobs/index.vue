<template>
  <div class="job-section">
    <div class="create">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-input v-model="inputSearch" @change="(value: string) => handleInputChange(value)" placeholder="Tìm kiếm"
            :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="9">
          <el-date-picker v-model="value1" type="daterange" range-separator="Đến" start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc" style="width: 95%;" />
        </el-col>

        <el-col :span="3">
          <el-select v-model="status" placeholder="Trạng thái" @change="(value) => handleSelectChange(value)">
            <el-option v-for="item in jobStore.optionsStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-select v-model="area" placeholder="Khu vực" @change="(value) => handleSelectChange(value)">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
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
        <el-table ref="tableRef" row-key="date" :data="jobStore.jobs" style="width: 100%" :border="true">
          {jobStore.jobs}
          <el-table-column prop="id" label="Id" sortable width="80" align="center" />
          <el-table-column prop="title" label="Tên" sortable />
          <el-table-column prop="summary" label="Tóm tắt" sortable />
          <el-table-column prop="imageUrl" label="Hình ảnh Url" sortable />
          <el-table-column prop="areaId" label="Khu vực" sortable align="center" />
          <el-table-column prop="expiredDate" label="Ngày hết hạn" sortable />
          <el-table-column prop="status" label="Trạng thái" sortable align="center" />
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
            <el-pagination v-model:current-page="jobStore.currentPage" v-model:page-size="jobStore.size"
              :page-sizes="[5, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
              :total="jobStore.totalElements" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Khởi tạo công việc" width="650">
      <el-form :model="form">
        <el-form-item label="Tên công việc" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" placeholder="Tên công việc" />
        </el-form-item>

        <el-form-item label="Khu vực" :label-width="formLabelWidth">
          <el-select v-model="form.areaId" placeholder="Khu vực">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
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
import type { Job } from '~/utils/interfaces';

const jobStore = useJobStore()
await jobStore.fetchJobs()
await jobStore.fetchArea()

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
const dialogFormVisible = ref(false)
const inputSearch = ref('')
const value1 = ref('')
const status = ref('')
const area = ref('')

const handleEdit = (index: number, row: Job) => {
  console.log(index, row)
}

const handleDelete = (index: number, row: Job) => {
  console.log(index, row)
}

const handleSizeChange = async (val: number) => {
  jobStore.size = val
  await jobStore.fetchJobs()
}

const handleCurrentChange = async (val: number) => {
  jobStore.page = val
  jobStore.currentPage - 1
  await jobStore.fetchJobs()
}

const handleInputChange = async (value: string) => {
  jobStore.searchTearm = value
  await jobStore.fetchJobs()
}

const handleSelectChange = async (value: string) => {
  jobStore.status = value
  await jobStore.fetchJobs()
}
</script>
