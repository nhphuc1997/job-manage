<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="resumeStore.data.resumes" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="userName" label="Tên người dùng" sortable />
      <el-table-column prop="fullName" label="Tên người dùng" sortable />
      <el-table-column prop="phoneNumber" label="Số điện thoại" sortable />
      <el-table-column prop="profileUrl" label="Url hồ sơ" align="center">
        <template #default="scope">
          <el-button size="small" type="primary" round plain :icon="TopRight" @click="redirectTo(scope.row.profileUrl)">
            Link
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Trạng thái" sortable width="200">
        <template #default="scope">
          <el-text>
            <el-tag size="small" :type="scope.row.status === 'FULL_UPDATED' ? 'success' : 'warning'">
              {{ parseStatus(scope.row.status) }}
            </el-tag>
          </el-text>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="resumeStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { TopRight } from '@element-plus/icons-vue';
const resumeStore = useResumeStore()

const parseStatus = (type: string) => {
  return {
    FULL_UPDATED: 'Đủ thông tin',
    NEED_ADDITIONAL_INFO: 'Thiếu thông tin bổ sung',
    NEED_MANDATORY_INFO: 'Thiếu thông tin bắt buộc'
  }[type]
}
</script>