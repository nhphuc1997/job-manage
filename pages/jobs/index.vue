<template>
  <div class="job-section">
    <JobFilter />
    <JobDataTable />
    <JobPagination />

    <JobDialogView />
    <JobDialogCreate />

    <!-- dialog edit job's status -->
    <el-dialog v-model="jobStore.dialogEditStatusFormVisible" title="Chỉnh sửa trạng thái công việc" width="450">
      <el-form :model="jobStore.detailJobObject">
        <el-form-item label="Trạng thái" :label-width="formLabelWidth">
          <el-select v-model="jobStore.jobStatusEdit">
            <template>
              <el-text>{{ jobStore.optionsStatus }}</el-text>
            </template>
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
</script>
