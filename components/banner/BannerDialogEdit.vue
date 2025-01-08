<template>
  <el-dialog v-model="bannerStore.dialog.editEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="bannerStore.loading.view" :model="bannerStore.data.viewEntity">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="bannerStore.data.editEntity.id" />
      </el-form-item>

      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="bannerStore.data.editEntity.url" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="bannerStore.dialog.editEntityVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="bannerStore.editEntity">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const bannerStore = useBannerStore()
</script>