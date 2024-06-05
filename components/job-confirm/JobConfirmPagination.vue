<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate">
          <el-pagination v-model:current-page="jobConfirmStore.metadata.currentPage"
            v-model:page-size="jobConfirmStore.metadata.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="jobConfirmStore.metadata.totalElements"
            @size-change="jobConfirmStore.paginationSizeChange"
            @current-change="jobConfirmStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
const jobConfirmStore = useJobConfirmStore()
</script>