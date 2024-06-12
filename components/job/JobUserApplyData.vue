<template>
  <div class="users-wrapper">
    <el-table v-loading="jobStore.data.loading" :data="jobStore.data.usersApply" style="width: 100%; height: 300px;"
      border>
      <el-table-column prop="employeeName" label="Tên" sortable />
      <el-table-column prop="userPhone" label="SĐT" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable>
        <template #default="scope">
          <div v-if="scope.row.status !== 'PENDING'">
            <el-tag size="small" :type="scope.row.status === 'APPROVED' ? 'success' : 'danger'">
              {{ parseStatus(scope.row.status) }}
            </el-tag>
          </div>

          <div v-else>
            <el-tag size="small" type="warning">
              {{ parseStatus(scope.row.status) }}
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
const parseStatus = (type: string) => {
  return {
    REJECT: 'Từ chối',
    APPROVED: 'Đồng ý',
    PENDING: 'Chờ chấp thuận',
  }[type]
}
</script>
