<template>
  <el-dialog v-model="jobConfirmStore.dialog.viewJobConfirmVisible" title="Chi tiết xác nhận" width="800" align-top>
    <el-tabs v-model="jobConfirmStore.data.detailTabPanelActive" class="demo-tabs">
      <el-tab-pane label="Xác nhận" name="tab-first">
        <el-form :model="jobConfirmStore.data.viewJobConfirm">
          <el-form-item label="Id" :label-width="formLabelWidth">
            <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.id" />
          </el-form-item>

          <el-form-item label="Lý do từ chối" :label-width="formLabelWidth">
            <el-input disabled v-model="jobConfirmStore.data.viewJobConfirm.rejectComment" type="textarea" />
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
      </el-tab-pane>

      <el-tab-pane label="Công việc" name="tab-second">
        <el-descriptions :column="3">
          <el-descriptions-item label="Id:" :span="3">
            {{ jobConfirmStore.data.viewJob.id }}
          </el-descriptions-item>

          <el-descriptions-item label="Khu vực:">
            <el-tag>
              {{ jobConfirmStore.data.viewJob.areaName }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Tên công việc:">
            <el-tag>
              {{ jobConfirmStore.data.viewJob.title }}
            </el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Ngày hết hạn:">
            <el-tag>{{ jobConfirmStore.data.viewJob.expiredDate }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane label="Hồ sơ" name="tab-third">
        <el-descriptions :column="2">
          <el-descriptions-item label-width="" label="Id:" :span="2">
            {{ jobConfirmStore.data.viewResume.id }}
          </el-descriptions-item>

          <el-descriptions-item label="Họ tên:">
            <el-tag>{{ jobConfirmStore.data.viewResume.fullName }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Tên người dùng:">
            <el-tag>{{ jobConfirmStore.data.viewResume.userName }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Ngày sinh:">
            <el-tag>{{ jobConfirmStore.data.viewResume.dateOfBird }}</el-tag>
          </el-descriptions-item>

          <el-descriptions-item label="Số điện thoại:">
            <el-tag>{{ jobConfirmStore.data.viewResume.phoneNumber }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

    </el-tabs>
  </el-dialog>
</template>

<style lang="scss" scoped>
.label-custom {
  width: 120px;
}
</style>

<script lang="ts" setup>
const formLabelWidth = '140px'
const jobConfirmStore = useJobConfirmStore()
</script>