<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate">
          <el-pagination v-model:current-page="userStore.metadata.currentPage"
            v-model:page-size="userStore.metadata.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="userStore.metadata.totalElements"
            @size-change="userStore.paginationSizeChange" @current-change="userStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
const userStore = useUserStore()
</script>