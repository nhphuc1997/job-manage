<template>
  <div class="area-section">
    <product-filter />
    <product-data-table />
    <product-pagination />
    <product-dialog-view />
    <product-dialog-create />
    <product-dialog-edit />
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
const userStore = useProductStore()
await userStore.fetchEntity()
loading.close()
</script>
