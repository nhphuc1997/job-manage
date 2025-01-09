<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="bannerStore.data.list" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="url" label="Hình ảnh">
        <template #default="scoped">
          <el-image style="width: 100px; height: 100px" :src="scoped.row.url" />
        </template>
      </el-table-column>
      <el-table-column align="center" width="70" label="Xoá">
        <template #default="scope">
          <el-button plain :icon="ElIconRemove" size="small" @click="bannerStore.removeEntity(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const bannerStore = useBannerStore()
</script>