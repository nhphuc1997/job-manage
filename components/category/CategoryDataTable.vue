<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="categoryStore.data.categories" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="name" label="Tên danh mục" sortable />
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="categoryStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button plain :icon="ElIconRemove" size="small" @click="categoryStore.removeEntity(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const categoryStore = useCategoryStore()
</script>