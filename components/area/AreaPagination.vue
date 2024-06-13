<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate hidden-sm-and-down">
          <el-pagination v-model:current-page="areaStore.metadata.currentPage"
            v-model:page-size="areaStore.metadata.size" :page-sizes="[5, 10, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="areaStore.metadata.totalElements"
            @size-change="areaStore.paginationSizeChange" @current-change="areaStore.paginationPageChange" class="" />
        </div>

        <div class="paginate hidden-md-and-up">
          <el-pagination layout="prev, pager, next" :total="areaStore.metadata.totalElements"
            @current-change="areaStore.paginationPageChange" />
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
const areaStore = useAreaStore()
</script>