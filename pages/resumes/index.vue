<template>
  <div class="job-section">
    <ResumeFilter />
    <ResumeDataTable />
    <ResumePagination />
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

const resumeStore = useResumeStore()
await resumeStore.fetchResumes()

</script>
