<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="jobConfirmStore.data.jobConfirm"  border max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="employeeName" label="Tên nhân viên" />
      <el-table-column prop="userPhone" label="Số điện thoại" />
      <el-table-column prop="createdAt" label="Ngày tạo" sortable width="200" />
      <el-table-column prop="jobTitle" label="Tên công việc">
        <template #default="scope">
          <el-tooltip effect="dark" :content="scope.row.jobTitle" placement="top">
            <el-text truncated>{{ scope.row.jobTitle }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="jobSummary" label="Tóm tắt ">
        <template #default="scope">
          <el-tooltip effect="dark" :content="scope.row.jobSummary" placement="top">
            <el-text truncated>{{ scope.row.jobSummary }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="150" align="center">
        <template #default="scope">
          <el-row :gutter="4">
            <el-col :span="24">
              <div v-if="scope.row.status === 'PENDING'">

                <el-popconfirm width="250" confirm-button-text="Đồng ý" cancel-button-text="Huỷ"
                  :title="`Chấp thuận công việc '${scope.row.jobTitle}'`"
                  @confirm="jobConfirmStore.updateApproveJob(scope.row)">
                  <template #reference>
                    <el-button plain type="success" size="small" :icon="ElIconCircleCheckFilled" />
                  </template>
                </el-popconfirm>

                <el-button type="danger" plain :icon="ElIconCircleCheckFilled" size="small"
                  @click="jobConfirmStore.openDialogEdit(scope.row)" />
              </div>
              <div v-else>
                <el-tag size="small" :type="scope.row.status === 'APPROVED' ? 'success' : 'danger'">
                  {{ parseStatusV2(scope.row.status) }}
                </el-tag>
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
const jobConfirmStore = useJobConfirmStore()
</script>