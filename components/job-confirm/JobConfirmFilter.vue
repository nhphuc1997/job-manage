<template>
  <div class="create">
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
</template>

<script lang="ts" setup>
const jobConfirmStore = useJobConfirmStore()
jobConfirmStore.fetchJobConfirm()
</script>
