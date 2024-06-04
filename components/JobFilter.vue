<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="jobStore.filter.search" @change="jobStore.fetchJobs" placeholder="Tìm kiếm"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-date-picker v-model="jobStore.filter.date" type="daterange" range-separator="Đến"
          start-placeholder="Ngày bắt đầu" end-placeholder="Ngày kết thúc" style="width: 95%;" />
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobStore.filter.status" placeholder="Trạng thái" @change="jobStore.fetchJobs">
          <el-option v-for="item in jobStore.optionsStatus" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobStore.filter.area" placeholder="Khu vực" @change="jobStore.fetchJobs">
          <el-option v-for="item in jobStore.optionsArea" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="jobStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>

      <el-col :span="3">
        <el-button @click="jobStore.dialog.createJobVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo công việc</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const jobStore = useJobStore()
</script>
