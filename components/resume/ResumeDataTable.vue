<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="resumeStore.data.resumes" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="userName" label="Id người dùng" sortable width="150" />
      <el-table-column prop="fullName" label="Tên người dùng" sortable width="150" />
      <el-table-column prop="phoneNumber" label="Nội dung" sortable />
      <el-table-column prop="profileUrl" label="Ngày tạo" sortable width="200" />
      <el-table-column prop="status" label="Ngày tạo" sortable width="200" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const resumeStore = useResumeStore()
</script>