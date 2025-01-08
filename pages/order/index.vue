<template>
  <div class="area-section">
    <order-filter />
    <order-data-table />
    <order-pagination />
    <order-dialog-view />
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  // middleware: ['auth']
})
const loading = ElLoading.service({ lock: true })
const orderStore = useOrderStore()
await orderStore.fetchEntity()
loading.close()
</script>
