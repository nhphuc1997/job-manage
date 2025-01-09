<template>
  <div class="area-section">
    <banner-filter />
    <banner-data-table />
    <banner-pagination />
    <banner-dialog-create />
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
const bannerStore = useBannerStore()
await bannerStore.fetchEntity()
loading.close()
</script>
