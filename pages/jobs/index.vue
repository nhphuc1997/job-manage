<template>
  <div class="job-section">
    <JobFilter />
    <JobDataTable />
    <JobPagination />

    <JobDialogView />
    <JobDialogCreate />
    <JobDialogEdit />

    <!-- dialog edit job's status -->
    <el-dialog v-model="jobStore.dialog.editJobStatusVisible" title="Chỉnh sửa trạng thái công việc" width="450">
      <el-form :model="jobStore.data.editStatusJob">
        <el-form-item label="Trạng thái" :label-width="formLabelWidth">
          <el-select v-model="jobStore.data.editStatusJob">
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
          <el-button @click="jobStore.dialog.editJobStatusVisible = false">Huỷ</el-button>
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

const jobStore = useJobStore()
await jobStore.fetchJobs()
await jobStore.fetchArea()

</script>
