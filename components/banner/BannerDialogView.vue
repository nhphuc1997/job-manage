<template>
  <el-dialog v-model="bannerStore.dialog.viewEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="bannerStore.loading.view" :model="bannerStore.data.viewEntity">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="bannerStore.data.viewEntity.id" />
      </el-form-item>
      <el-form-item label="url" :label-width="formLabelWidth">
        <el-input disabled v-model="bannerStore.data.viewEntity.url" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const bannerStore = useBannerStore()
</script>