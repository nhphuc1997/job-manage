<template>
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="9">
        <el-input v-model="cateogryStore.filter.fulltext" @change="cateogryStore.fetchEntity" placeholder="Tìm kiếm tên"
          :suffix-icon="ElIconSearch" />
      </el-col>
    </el-row>
  </div>

</template>


<style lang="scss" scoped>
@import url('element-plus/theme-chalk/display.css');
@import url('/assets/styles/job.scss');

.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

<script lang="ts" setup>
const cateogryStore = useCategoryStore()
</script>
