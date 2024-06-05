<template>
  <div class="footer">
    <el-row>
      <el-col :span="24">
        <div class="paginate">
          <el-pagination v-model:current-page="smsStore.metadata.currentPage" v-model:page-size="smsStore.metadata.size"
            :page-sizes="[5, 10, 100]" layout="total, sizes, prev, pager, next, jumper"
            :total="smsStore.metadata.totalElements" @size-change="smsStore.paginationSizeChange"
            @current-change="smsStore.paginationPageChange" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/job.scss');
</style>

<script lang="ts" setup>
const smsStore = useSmsStore()
</script>