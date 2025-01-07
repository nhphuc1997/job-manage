<template>
  <el-dialog v-model="categoryStore.dialog.createCategoryVisible" title="Tạo danh mục" width="600" align-top>
    <el-form :model="categoryStore.data.newCategory">
      <el-form-item label="Tên" :label-width="formLabelWidth">
        <el-input v-model="categoryStore.data.newCategory.name" autocomplete="off" placeholder="Tên danh mục" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="categoryStore.dialog.createCategoryVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="categoryStore.createEntity">
          Tạo mới
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const categoryStore = useCategoryStore()
</script>