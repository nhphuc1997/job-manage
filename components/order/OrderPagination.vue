<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate hidden-sm-and-down">
          <el-pagination v-model:current-page="orderStore.metadata.currentPage"
            v-model:page-size="orderStore.metadata.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="orderStore.metadata.totalElements"
            @size-change="orderStore.paginationSizeChange" @current-change="orderStore.paginationPageChange" />
        </div>

        <div class="paginate hidden-sm-and-up">
          <el-pagination layout="prev, pager, next" :total="orderStore.metadata.totalElements"
            @current-change="orderStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
@import url('element-plus/theme-chalk/display.css');
</style>

<script lang="ts" setup>
const orderStore = useOrderStore()
</script>