<template>
  <div class="create">
    <el-descriptions :column="6" :title="useUpperCase(jobStore.data.viewJob.title)">
      <el-descriptions-item :span="2" label="Ngày tạo:">
        <el-tag type="primary">{{ jobStore.data.viewJob.createdAt }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item :span="2" label="Chỉnh sửa:">
        <el-tag type="primary">{{ jobStore.data.viewJob.updatedAt }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item :span="2" label="Ngày hết hạn:">
        <el-tag type="primary">{{ jobStore.data.viewJob.expiredDate }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-row :gutter="6">
      <el-col :span="8">
        <el-input v-model="jobStore.filterUserApplyJob.fulltext" @change="jobStore.fetchUsersApplyJob"
          placeholder="Tìm kiếm tên, sđt" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="8">
        <el-date-picker v-model="jobStore.filterUserApplyJob.date" type="datetimerange" range-separator="Đến"
          start-placeholder="Ngày tạo" end-placeholder="Ngày tạo" style="width: 90%;"
          @change="jobStore.fetchUsersApplyJob" format="DD-MM-YYYY HH:mm:ss" date-format="DD/MM/YYYY"
          time-format="HH:mm:ss" />
      </el-col>

      <el-col :span="4">
        <el-select v-model="jobStore.filterUserApplyJob.status" placeholder="Trạng thái"
          @change="jobStore.fetchUsersApplyJob">
          <el-option v-for="item in jobStore.data.listStatusJobConfirm" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-button @click="jobStore.resetFilterUsersApply" plain style="width: 100%;" type="info" :icon="ElIconMug">
          Xoá bộ lọc
        </el-button>
      </el-col>

    </el-row>
  </div>
</template>

<script lang="ts" setup>
const jobStore = useJobStore()
</script>
