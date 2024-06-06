<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="smsStore.filter.fulltext" @change="smsStore.fetchSms"
          placeholder="Tìm kiếm tên người dùng / nội dung" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-date-picker v-model="smsStore.filter.createdDate" type="daterange" range-separator="Đến"
          start-placeholder="Ngày tạo" end-placeholder="Ngày tạo" style="width: 95%;" @change="smsStore.fetchSms" />
      </el-col>

      <el-col :span="3">
        <el-button @click="smsStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const smsStore = useSmsStore()
</script>
