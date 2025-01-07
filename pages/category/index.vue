<template>
  <div class="area-section">
    <category-filter />
    <category-data-table />
    <category-pagination />
    <category-dialog-view />
    <category-dialog-create />
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
const userStore = useCategoryStore()
await userStore.fetchEntity()
loading.close()
</script>
