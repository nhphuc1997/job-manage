<template>
  <el-dialog v-model="resumeStore.dialog.viewResumeVisible" title="Chi tiết hồ sơ" width="800" align-top
    @close="resumeStore.resetTab">
    <el-tabs v-model="resumeStore.data.detailTabPanelActive">
      <el-tab-pane label="Thông tin" name="tab-first">
        <el-form :model="resumeStore.data.viewResume">
          <el-form-item label="Id" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.id" />
          </el-form-item>

          <el-form-item label="Tên người dùng" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.userName" />
          </el-form-item>

          <el-form-item label="Tên đầy đủ" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.fullName" />
          </el-form-item>

          <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.phoneNumber" />
          </el-form-item>

          <el-form-item label="Ngày sinh" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.dateOfBird" />
          </el-form-item>

          <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.address" />
          </el-form-item>

          <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.createdAt" />
          </el-form-item>

          <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.updatedAt" />
          </el-form-item>

          <el-form-item label="Tạo bởi" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.createdBy" />
          </el-form-item>

          <el-form-item label="Lần cuối chỉnh sửa" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.lastModifiedBy" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Giấy tờ" name="tab-second">
        <div class="demo-collapse">
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template #title>
                <el-icon size="16">
                  <ElIconFiles />
                </el-icon>
                <el-text class="text-intro">Thông tin cá nhân</el-text>
              </template>

              <div>
                1
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style lang="scss" scoped>
.text-intro {
  padding-left: 8px;
}
</style>

<script lang="ts" setup>
const formLabelWidth = '140px'
const resumeStore = useResumeStore()
</script>