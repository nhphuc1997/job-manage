<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="smsStore.data.sms" style="width: 100%" :border="true" height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="userId" label="Id người dùng" sortable width="150" />
      <el-table-column prop="userName" label="Tên người dùng" sortable width="150" />
      <el-table-column prop="content" label="Nội dung" sortable />
      <el-table-column prop="createdDate" label="Ngày tạo" sortable width="200" />
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="smsStore.openDialogViewJob(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const smsStore = useSmsStore()
</script>