<template>
  <div class="job-section">
    <div class="create">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-input v-model="inputSearch" @change="(value: string) => handleInputSearchChange(value)"
            placeholder="Tìm kiếm" :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="6">
          <el-date-picker v-model="value1" type="daterange" range-separator="Đến" start-placeholder="Ngày bắt đầu"
            end-placeholder="Ngày kết thúc" style="width: 95%;" />
        </el-col>

        <el-col :span="3">
          <el-select v-model="status" placeholder="Trạng thái" @change="(value) => handleSelectChange(value, 'status')">
            <el-option v-for="item in jobStore.optionsStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-select v-model="area" placeholder="Khu vực" @change="(value) => handleSelectChange(value, 'area')">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="3">
          <el-button @click="jobStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
            lọc</el-button>
        </el-col>

        <el-col :span="3">
          <el-button @click="jobStore.dialogNewFormVisible = true" plain style="width: 100%;" type="success"
            :icon="ElIconWindPower">Tạo công việc</el-button>
        </el-col>

      </el-row>
    </div>

    <div class="infor">
      <el-table ref="tableRef" row-key="date" :data="jobStore.jobs" style="width: 100%" :border="true" height="600">
        {jobStore.jobs}
        <el-table-column prop="id" label="Id" sortable width="80" align="center" />
        <el-table-column prop="title" label="Tên" sortable />
        <el-table-column prop="summary" label="Tóm tắt" sortable />
        <el-table-column prop="imageUrl" label="Hình ảnh Url" sortable>
          <template #default="scope">
            <el-text type="primary">
              {{ scope.row.imageUrl }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="areaId" label="Khu vực" sortable align="center" />
        <el-table-column prop="expiredDate" label="Ngày hết hạn" sortable />
        <el-table-column prop="status" label="Trạng thái" sortable align="center">
          <template #default="scope">
            <el-row>
              <el-col :span="12">
                <el-button v-if="scope.row.status === 'ACTIVE'" type="success" size="small" plain
                  :icon="ElIconWarningFilled" disabled>
                  {{ String(scope.row.status).toLowerCase() }}
                </el-button>

                <el-button v-else type="info" size="small" plain :icon="ElIconWarnTriangleFilled" disabled>
                  {{ String(scope.row.status).toLowerCase() }}
                </el-button>
              </el-col>

              <el-col :span="12">
                <el-button type="primary" :icon="ElIconEditPen" size="small" plain
                  @click="handleEditStatus(scope.$index, scope.row)" />
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #default="scope">
            <el-button :icon="ElIconEdit" size="small" @click="handleEdit(scope.$index, scope.row)" />
            <el-button plain :icon="ElIconView" size="small" @click="handleView(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <el-row>
        <el-col :span="24">
          <div class="paginate">
            <el-pagination v-model:current-page="jobStore.currentPage" v-model:page-size="jobStore.size"
              :page-sizes="[5, 10, 100]" layout="total, sizes, prev, pager, next, jumper"
              :total="jobStore.totalElements" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- dialog view job -->
    <el-dialog v-model="jobStore.dialogViewFormVisible" title="Chi tiết công việc" width="800">
      <el-form :model="jobStore.detailJobObject">
        <el-form-item label="Id" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.id" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Tên công việc" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.title" autocomplete="off" />
        </el-form-item>

        <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.imageUrl" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Khu vực" :label-width="formLabelWidth">
          <el-select disabled v-model="jobStore.detailJobObject.areaId">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
          <el-date-picker disabled style="width: 100%;" v-model="jobStore.detailJobObject.expiredDate" type="date" />
        </el-form-item>

        <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.summary" style="width: 100%" :rows="2" type="textarea" />
        </el-form-item>

        <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.description" style="width: 100%" :rows="2"
            type="textarea" />
        </el-form-item>

        <el-form-item label="Nội dung html" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.htmlContent" style="width: 100%" :rows="2"
            type="textarea" />
        </el-form-item>

        <el-form-item label="Tạo mới lúc" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.createdAt" style="width: 100%" :rows="2" />
        </el-form-item>

        <el-form-item label="Cập nhập lúc" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.updatedAt" style="width: 100%" :rows="2" />
        </el-form-item>

        <el-form-item label="Người tạo" :label-width="formLabelWidth">
          <el-input disabled v-model="jobStore.detailJobObject.createdBy" style="width: 100%" :rows="2" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- dialog init job -->

    <!-- dialog init job -->
    <el-dialog v-model="jobStore.dialogNewFormVisible" title="Khởi tạo công việc" width="650">
      <el-form :model="jobStore.newJobObject">
        <el-form-item label="Tên công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.newJobObject.title" autocomplete="off" placeholder="Tên công việc" />
        </el-form-item>

        <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
          <el-input v-model="jobStore.newJobObject.imageUrl" autocomplete="off" placeholder="URL hình ảnh" />
        </el-form-item>

        <el-form-item label="Khu vực" :label-width="formLabelWidth">
          <el-select v-model="jobStore.newJobObject.areaId" placeholder="Khu vực">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
          <el-date-picker style="width: 100%;" v-model="jobStore.newJobObject.expiredDate" type="date"
            placeholder="Ngày hết hạn" />
        </el-form-item>

        <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.newJobObject.summary" style="width: 100%" :rows="2" type="textarea"
            placeholder="Tóm tắt công việc" />
        </el-form-item>

        <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.newJobObject.description" style="width: 100%" :rows="2" type="textarea"
            placeholder="Mô tả công việc" />
        </el-form-item>

        <el-form-item label="Nội dung html" :label-width="formLabelWidth">
          <el-input v-model="jobStore.newJobObject.htmlContent" style="width: 100%" :rows="2" type="textarea"
            placeholder="Nội dung html" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="jobStore.dialogNewFormVisible = false">Huỷ</el-button>
          <el-button type="primary" @click="jobStore.createJob">
            Tạo mới
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- dialog init job -->

    <!-- dialog edit job -->
    <el-dialog v-model="jobStore.dialogEditFormVisible" title="Chỉnh sửa công việc" width="650">
      <el-form :model="jobStore.editJobObject">
        <el-form-item label="Tên công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.editJobObject.title" autocomplete="off" placeholder="Tên công việc" />
        </el-form-item>

        <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
          <el-input v-model="jobStore.editJobObject.imageUrl" autocomplete="off" placeholder="URL hình ảnh" />
        </el-form-item>

        <el-form-item label="Khu vực" :label-width="formLabelWidth">
          <el-select v-model="jobStore.editJobObject.areaId" placeholder="Khu vực">
            <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
          <el-date-picker style="width: 100%;" v-model="jobStore.editJobObject.expiredDate" type="date"
            placeholder="Ngày hết hạn" />
        </el-form-item>

        <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.editJobObject.summary" style="width: 100%" :rows="2" type="textarea"
            placeholder="Tóm tắt công việc" />
        </el-form-item>

        <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
          <el-input v-model="jobStore.editJobObject.description" style="width: 100%" :rows="2" type="textarea"
            placeholder="Mô tả công việc" />
        </el-form-item>

        <el-form-item label="Nội dung html" :label-width="formLabelWidth">
          <el-input v-model="jobStore.editJobObject.htmlContent" style="width: 100%" :rows="2" type="textarea"
            placeholder="Mô tả công việc" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="jobStore.dialogEditFormVisible = false">Huỷ</el-button>
          <el-button type="primary" @click="jobStore.updateJob">
            Chỉnh sửa
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- dialog edit job -->

    <!-- dialog edit job's status -->
    <el-dialog v-model="jobStore.dialogEditStatusFormVisible" title="Chỉnh sửa trạng thái công việc" width="450">
      <el-form :model="jobStore.detailJobObject">
        <el-form-item label="Trạng thái" :label-width="formLabelWidth">
          <el-select v-model="jobStore.jobStatusEdit">
            <el-option v-for="item in jobStore.optionsStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="jobStore.dialogEditStatusFormVisible = false">Huỷ</el-button>
          <el-button type="primary" @click="jobStore.editStatus">
            Chỉnh sửa
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- dialog edit job -->

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
const inputSearch = ref('')
const value1 = ref('')
const status = ref('')
const area = ref('')

const handleEdit = (index: number, job: Job) => {
  console.log(index, job)
  jobStore.editJob(job, 'edit_job_attr')
}

const handleEditStatus = (index: number, job: Job) => {
  console.log(index, job)
  jobStore.editJob(job, 'edit_job_status')
}

const handleView = async (index: number, job: Job) => {
  console.log(index, job)
  await jobStore.detailJob(job)
  jobStore.dialogViewFormVisible = true
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

const handleInputSearchChange = async (value: string) => {
  jobStore.searchTearm = value
  await jobStore.fetchJobs()
}

const handleSelectChange = async (value: string, type: 'status' | 'area') => {

  if (type === 'status') {
    jobStore.status = value
  }

  if (type === 'area') {
    jobStore.area = value
  }

  await jobStore.fetchJobs()
}
</script>
