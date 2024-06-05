<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="jobConfirmStore.filter.employeeName" @change="jobConfirmStore.fetchJobConfirm"
          placeholder="Tìm kiếm tên" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-input v-model="jobConfirmStore.filter.userPhone" @change="jobConfirmStore.fetchJobConfirm"
          placeholder="Tìm kiếm số điện thoại" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-input v-model="jobConfirmStore.filter.jobFilter" @change="jobConfirmStore.fetchJobConfirm"
          placeholder="Tìm kiếm nội dung công việc" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobConfirmStore.filter.status" placeholder="Trạng thái">
          <el-option v-for="item in jobConfirmStore.data.optionsStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="jobConfirmStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const jobConfirmStore = useJobConfirmStore()
jobConfirmStore.fetchJobConfirm()
</script>
