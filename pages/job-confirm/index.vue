<template>
  <div class="area-section">
    <JobConfirmFilter />
    <JobConfirmDataTable />
    <JobConfirmPagination />

    <JobConfirmDialogView />
    <JobConfirmDialogEditStatus />

  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>

definePageMeta({
  layout: 'default'
})

const jobConfirmStore = useJobConfirmStore()
await jobConfirmStore.fetchJobConfirm()

</script>
