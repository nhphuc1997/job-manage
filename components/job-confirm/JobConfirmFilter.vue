<template>
  <!-- desktop -->
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-input v-model="jobConfirmStore.filter.fulltext" @change="jobConfirmStore.fetchJobConfirm"
          placeholder="Tìm kiếm tên nhân viên, số điện thoại, thông tin công việc" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobConfirmStore.filter.status" placeholder="Trạng thái"
          @change="jobConfirmStore.fetchJobConfirm">
          <el-option v-for="item in jobConfirmStore.data.optionsForFilterStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="jobConfirmStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- mobie -->
  <div class="create hidden-sm-and-up">
    <el-row :gutter="10">
      <el-col :span="24" class="flex-end">
        <el-button type="primary" plain :icon="Filter" @click="jobConfirmStore.drawer.filterJobConfirm = true" />
      </el-col>
    </el-row>

    <el-drawer v-model="jobConfirmStore.drawer.filterJobConfirm" direction="btt">
      <el-row :gutter="10">
        <el-col :span="24" class="px-4">
          <el-input v-model="jobConfirmStore.filter.fulltext" @change="jobConfirmStore.fetchJobConfirm"
            placeholder="Tìm kiếm tên nhân viên, số điện thoại, thông tin công việc" :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="12" class="px-4">
          <el-select v-model="jobConfirmStore.filter.status" placeholder="Trạng thái"
            @change="jobConfirmStore.fetchJobConfirm">
            <el-option v-for="item in jobConfirmStore.data.optionsForFilterStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-button @click="jobConfirmStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
            Xoá bộ lọc
          </el-button>
        </el-col>
      </el-row>
    </el-drawer>
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
import { Filter } from '@element-plus/icons-vue'

const jobConfirmStore = useJobConfirmStore()
jobConfirmStore.fetchJobConfirm()
</script>
