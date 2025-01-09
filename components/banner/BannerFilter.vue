<template>
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="3">
        <el-button @click="bannerStore.dialog.createEntityVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo banner</el-button>
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
const bannerStore = useBannerStore()
</script>
