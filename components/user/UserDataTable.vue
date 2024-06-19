<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="userStore.data.users" border max-height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="username" label="Tên người dùng" sortable />
      <el-table-column prop="email" label="Email" sortable />
      <el-table-column prop="phone" label="Số điện thoại" sortable />
      <el-table-column prop="status" label="Trạng thái" width="200" sortable>
        <template #default="scope">
          <el-tag size="small" :type="scope.row.status === 'ACTIVE' ? 'success' : 'danger'">
            {{ parseStatusV1(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button plain :icon="ElIconView" size="small" @click="userStore.openDialogView(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
</script>