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
definePageMeta({
  layout: 'default'
})

const jobStore = useJobStore()
await jobStore.fetchJobs()
await jobStore.fetchArea()

</script>
