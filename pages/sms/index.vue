<template>
  <div class="area-section">
    <SmsFilter />
    <SmsDataTable />
    <SmsPagination />

    <SmsDialogView />
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>

definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

const loading = ElLoading.service({ lock: true })
setTimeout(() => loading.close(), LOADING_TIMEOUT)

const smsStore = useSmsStore()
await smsStore.fetchSms()

</script>
