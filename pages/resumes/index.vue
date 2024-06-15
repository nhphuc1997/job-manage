<template>
  <div class="job-section">
    <ResumeFilter />
    <ResumeDataTable />
    <ResumePagination />

    <ResumeDialogView />
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

const resumeStore = useResumeStore()
await resumeStore.fetchResumes()

loading.close()
</script>
