<template>
  <div class="users-wrapper">
    <el-table v-loading="jobStore.data.loading" :data="jobStore.data.usersApply" max-height="300" border>
      <el-table-column prop="employeeName" label="Tên" sortable />
      <el-table-column prop="userPhone" label="SĐT" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable>
        <template #default="scope">
          <div v-if="scope.row.status !== 'PENDING'">
            <el-tag size="small" :type="scope.row.status === 'APPROVED' ? 'success' : 'danger'">
              {{ parseStatusV2(scope.row.status) }}
            </el-tag>
          </div>

          <div v-else>
            <el-tag size="small" type="warning">
              {{ parseStatusV2(scope.row.status) }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Ngày tạo" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.users-wrapper {
  width: 100%;
  overflow-y: auto;
  padding: 16px 0px;
}
</style>

<script lang="ts" setup>
const jobStore = useJobStore()

</script>
