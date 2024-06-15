<template>
  <el-dialog v-model="resumeStore.dialog.viewResumeVisible" title="Chi tiết người dùng" width="800" align-top>
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
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const resumeStore = useResumeStore()
</script>