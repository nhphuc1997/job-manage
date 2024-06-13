<template>
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="smsStore.filter.fulltext" @change="smsStore.fetchSms"
          placeholder="Tìm kiếm tên người dùng, nội dung" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="7">
        <el-date-picker v-model="smsStore.filter.createdDate" type="datetimerange" range-separator="Đến"
          start-placeholder="Ngày tạo" end-placeholder="Ngày tạo" style="width: 95%;" @change="smsStore.fetchSms"
          format="DD-MM-YYYY HH:mm:ss" date-format="DD/MM/YYYY" time-format="HH:mm:ss" />
      </el-col>

      <el-col :span="3">
        <el-button @click="smsStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
          Xoá bộ lọc
        </el-button>
      </el-col>
    </el-row>
  </div>

  <div class="create hidden-sm-and-up">
    <el-row :gutter="10" class="hidden-sm-and-up">
      <el-col :span="24" class="flex-end">
        <el-button type="primary" plain :icon="Filter" @click="smsStore.drawer.filterArea = true" />
      </el-col>
    </el-row>

    <el-drawer v-model="smsStore.drawer.filterArea" direction="btt">
      <el-row :gutter="4" class="">
        <el-col :span="24" class="px-4">
          <el-input v-model="smsStore.filter.fulltext" @change="smsStore.fetchSms"
            placeholder="Tìm kiếm tên người dùng, nội dung" :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="12" class="px-4">
          <el-button @click="smsStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
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

const smsStore = useSmsStore()
</script>
