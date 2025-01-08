<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="productStore.data.list" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="name" label="Tên sản phẩm" sortable />
      <el-table-column prop="price" label="Giá" sortable />
      <el-table-column prop="categoryName" label="Danh mục" sortable />
      <el-table-column align="center" width="70" label="Xem">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="productStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="70" label="Sửa">
        <template #default="scope">
          <el-button plain :icon="ElIconEditPen" size="small" @click="productStore.openDialogEdit(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="70" label="Xoá">
        <template #default="scope">
          <el-button plain :icon="ElIconRemove" size="small" @click="productStore.removeEntity(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const productStore = useProductStore()
</script>