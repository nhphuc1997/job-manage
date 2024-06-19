<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="resumeStore.data.resumes" border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="userName" label="Tên người dùng" sortable />
      <el-table-column prop="fullName" label="Tên người dùng" sortable />
      <el-table-column prop="phoneNumber" label="Số điện thoại" sortable />
      <el-table-column prop="profileUrl" label="Url hồ sơ" align="center">
        <template #default="scope">
          <el-button size="small" type="primary" round plain :icon="ElIconTopRight" @click="redirectTo(scope.row.profileUrl)">
            Link
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Trạng thái" sortable width="200">
        <template #default="scope">
          <el-text>
            <el-tag size="small" :type="parseElTagResumeStatus(scope.row.status)">
              {{ parseResumeStatus(scope.row.status) }}
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
const resumeStore = useResumeStore()
</script>