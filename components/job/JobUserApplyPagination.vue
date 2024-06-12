<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate">
          <el-pagination v-model:current-page="jobStore.metadataJobAppy.currentPage"
            v-model:page-size="jobStore.metadataJobAppy.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="jobStore.metadataJobAppy.totalElements"
            @size-change="jobStore.paginationSizeChange" @current-change="jobStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
const jobStore = useJobStore()
</script>