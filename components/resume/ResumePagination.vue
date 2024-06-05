<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate">
          <el-pagination v-model:current-page="resumeStore.metadata.currentPage"
            v-model:page-size="resumeStore.metadata.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="resumeStore.metadata.totalElements"
            @size-change="resumeStore.paginationPageChange" @current-change="resumeStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
const resumeStore = useResumeStore()
</script>