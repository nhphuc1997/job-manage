<template>
  <div class="area-section">
    <UserFilter />
    <UserDataTable />
    <UserPagination />

    <UserDialogView />
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

const userStore = useUserStore()
await userStore.fetchUsers()

loading.close()
</script>
