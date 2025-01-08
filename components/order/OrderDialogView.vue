<template>
  <el-dialog v-model="orderStore.dialog.viewEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="orderStore.loading.view" :model="orderStore.data.viewEntity">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.id" />
      </el-form-item>

      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.name" />
      </el-form-item>

      <el-form-item label="Giá sản phẩm" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.price" />
      </el-form-item>

      <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.createAt" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.updatedAt" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const orderStore = useOrderStore()
</script>