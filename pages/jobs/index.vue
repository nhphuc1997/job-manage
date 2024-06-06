<template>
  <div class="job-section">
    <JobFilter />
    <JobDataTable />
    <JobPagination />

    <JobDialogView />
    <JobDialogCreate />
    <JobDialogEdit />
    <JobDialogEditStatus />

  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
import { JobDataTable } from '#components'

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const loading = ElLoading.service({ lock: true })
setTimeout(() => loading.close(), LOADING_TIMEOUT)

const jobStore = useJobStore()
await jobStore.fetchJobs()
await jobStore.fetchArea()

</script>
