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
  layout: 'default',
  middleware: ['auth']
})
const loading = ElLoading.service({ lock: true, background: 'rgba(0, 0, 0, 0.7)' })

const areaStore = useAreaStore()
await areaStore.fetchAreas()

loading.close()
</script>
