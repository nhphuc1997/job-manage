<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="resumeStore.data.resumes" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="userName" label="Tên người dùng" sortable />
      <el-table-column prop="fullName" label="Tên người dùng" sortable />
      <el-table-column prop="phoneNumber" label="Số điện thoại" sortable />
      <el-table-column prop="profileUrl" label="Url hồ sơ" sortable width="400" />
      <el-table-column prop="status" label="Trạng thái" sortable width="200" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const resumeStore = useResumeStore()
</script>