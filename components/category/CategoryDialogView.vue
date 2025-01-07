<template>
  <el-dialog v-model="categoryStore.dialog.viewCategoryVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="categoryStore.loading.view" :model="categoryStore.data.viewCategory">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="categoryStore.data.viewCategory.id" />
      </el-form-item>

      <el-form-item label="Tên danh mục" :label-width="formLabelWidth">
        <el-input disabled v-model="categoryStore.data.viewCategory.name" />
      </el-form-item>

      <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="categoryStore.data.viewCategory.createAt" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="categoryStore.data.viewCategory.updatedAt" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const categoryStore = useCategoryStore()
</script>