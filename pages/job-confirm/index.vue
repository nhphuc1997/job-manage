<template>
  <div class="area-section">
    <JobConfirmFilter />
    <JobConfirmDataTable />
    <JobConfirmPagination />

    <JobConfirmDialogView />

  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>

definePageMeta({
  layout: 'default'
})

const smsStore = useSmsStore()
await smsStore.fetchSms()

</script>
