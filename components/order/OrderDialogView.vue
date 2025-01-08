<template>
  <el-dialog v-model="orderStore.dialog.viewEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="orderStore.loading.view" :model="orderStore.data.viewEntity">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.id" />
      </el-form-item>

      <el-form-item label="Mã đơn hàng" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.order_number" />
      </el-form-item>

      <el-form-item label="Tổng tiền" :label-width="formLabelWidth">
        <el-input disabled v-model="orderStore.data.viewEntity.total_price" />
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