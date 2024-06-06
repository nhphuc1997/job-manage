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
      <el-table-column prop="status" label="Trạng thái" sortable width="200" align="center">
        <template #default="scope">
          <el-text>
            <el-button plain size="small" :type="scope.row.status === 'FULL_UPDATED' ? 'success' : 'warning'" round>
              {{ String(scope.row.status).toLowerCase() }}
            </el-button>
          </el-text>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { TopRight } from '@element-plus/icons-vue';
const resumeStore = useResumeStore()

const redirectTo = (path: string) => {
  return navigateTo({ path }, { open: { target: '_blank' } })
}
</script>