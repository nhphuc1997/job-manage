<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="bannerStore.data.list" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="url" label="Hình ảnh" sortable />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const bannerStore = useBannerStore()
</script>