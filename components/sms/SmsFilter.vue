<template>
  <div class="create">
    <el-row :gutter="12">

      <el-col :span="6">
        <el-date-picker v-model="smsStore.filter.createdDate" type="daterange" range-separator="Đến"
          start-placeholder="Ngày bắt đầu" end-placeholder="Ngày kết thúc" style="width: 95%;" />
      </el-col>

      <el-col :span="6">
        <el-input v-model="smsStore.filter.userName" @change="smsStore.fetchSms" placeholder="Tìm kiếm tên người dùng"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-input v-model="smsStore.filter.content" @change="smsStore.fetchSms" placeholder="Tìm kiếm nội dung sms"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="3" :offset="3">
        <el-button @click="smsStore.dialog.createSmsVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo sms</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const smsStore = useSmsStore()
</script>
