<template>
  <div class="area-section">
    <AreaFilter />
    <AreaDataTable />
    <AreaPagination />

    <AreaDialogView />
    <AreaDialogCreate />
    <AreaDialogEdit />
    <AreaDialogEditStatus />

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
