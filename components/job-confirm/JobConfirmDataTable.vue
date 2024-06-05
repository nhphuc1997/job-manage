<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="jobConfirmStore.data.jobConfirm" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="resumeId" label="Id hồ sơ" sortable width="100" />
      <el-table-column prop="employeeName" label="Tên nhân viên" sortable />
      <el-table-column prop="userPhone" label="Nội dung" sortable />
      <el-table-column prop="jobId" label="Mã công việc" sortable />
      <el-table-column prop="jobTitle" label="Tên công việc" sortable />
      <el-table-column prop="jobSummary" label="Tóm tắt " sortable />
      <el-table-column prop="createdAt" label="Ngày tạo" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable />
      <el-table-column align="center" width="120">
        <template #default="scope">
          <el-button type="success" plain :icon="SwitchFilled" size="small"
            @click="jobConfirmStore.openDialogEdit(scope.row)" />

          <el-button plain :icon="ElIconView" size="small" @click="jobConfirmStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { SwitchFilled } from '@element-plus/icons-vue'
const jobConfirmStore = useJobConfirmStore()
</script>