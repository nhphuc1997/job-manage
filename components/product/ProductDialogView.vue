<template>
  <el-dialog v-model="productStore.dialog.viewEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="productStore.loading.view" :model="productStore.data.viewEntity">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.id" />
      </el-form-item>

      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.name" />
      </el-form-item>

      <el-form-item label="Giá sản phẩm" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.price" />
      </el-form-item>

      <el-form-item label="Danh mục" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.categoryName" />
      </el-form-item>

      <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.createAt" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.viewEntity.updatedAt" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const productStore = useProductStore()
</script>