<template>
  <el-dialog v-model="categoryStore.dialog.editEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="categoryStore.loading.view" :model="categoryStore.data.viewEntity">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="categoryStore.data.editEntity.id" />
      </el-form-item>

      <el-form-item label="Tên danh mục" :label-width="formLabelWidth">
        <el-input v-model="categoryStore.data.editEntity.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="categoryStore.dialog.editEntityVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="categoryStore.editEntity">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const categoryStore = useCategoryStore()
</script>