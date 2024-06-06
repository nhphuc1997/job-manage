<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="jobConfirmStore.data.jobConfirm" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="resumeId" label="Id hồ sơ" sortable width="100" />
      <el-table-column prop="status" label="Trạng thái" sortable />
      <el-table-column prop="createdAt" label="Ngày tạo" sortable />
      <el-table-column prop="employeeName" label="Tên nhân viên" />
      <el-table-column prop="userPhone" label="Số điện thoại" />
      <el-table-column prop="jobId" label="Mã công việc" />
      <el-table-column prop="jobTitle" label="Tên công việc" />
      <el-table-column prop="jobSummary" label="Tóm tắt " />
      <el-table-column label="Xác nhận" align="center" width="100">
        <template #default="scope">
          <el-row :gutter="4">
            <el-col :span="24">
              <div v-if="scope.row.status === 'PENDING'">
                <el-button type="success" plain :icon="SwitchFilled" size="small"
                  @click="jobConfirmStore.openDialogEdit(scope.row)" />
              </div>
              <div v-else>
                <el-button size="small" type="success" :icon="CircleCheckFilled" circle plain
                  v-if="scope.row.status === 'APPROVED'" />
                <el-button size="small" type="warning" :icon="CircleCloseFilled" circle plain
                  v-if="scope.row.status === 'REJECT'" />
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template #default="scope">
          <el-row :gutter="4">
            <el-col :span="24">
              <el-button plain :icon="ElIconView" size="small" @click="jobConfirmStore.openDialogView(scope.row)" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { SwitchFilled, CircleCheckFilled, CircleCloseFilled } from '@element-plus/icons-vue'
const jobConfirmStore = useJobConfirmStore()
</script>