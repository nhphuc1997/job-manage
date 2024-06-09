<template>
  <el-dialog v-model="jobConfirmStore.dialog.viewJobConfirmVisible" title="Chi tiết xác nhận công việc" width="800"
    align-top>
    <el-form :model="jobConfirmStore.data.viewJobConfirm">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.id" />
      </el-form-item>

      <el-form-item label="Id hồ sơ" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.resumeId" />
      </el-form-item>

      <el-form-item label="Id công việc" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.jobId" />
      </el-form-item>

      <el-form-item label="Id người xác nhận" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.confirmUserId" />
      </el-form-item>

      <el-form-item label="Lý do từ chối" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.rejectComment" />
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.status" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa bởi" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.lastModifiedBy" />
      </el-form-item>

      <el-form-item label="Tạo bởi" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.createdBy" />
      </el-form-item>

      <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.createdAt" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.updatedAt" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const jobConfirmStore = useJobConfirmStore()
</script>