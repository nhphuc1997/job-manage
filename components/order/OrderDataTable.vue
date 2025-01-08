<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="orderStore.data.list" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="order_number" label="Mã đơn hàng" sortable />
      <el-table-column prop="total_price" label="Tổng đơn hàng" sortable />
      <el-table-column prop="user_name" label="Tên người đặt hàng" sortable />
      <el-table-column align="center" width="70" label="Xem">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="orderStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const orderStore = useOrderStore()
</script>