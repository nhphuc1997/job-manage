<template>
  <div class="area-section">
    <SmsFilter />
    <SmsDataTable />
    <SmsPagination />

    <SmsDialogView />
    <SmsDialogCreate />

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
