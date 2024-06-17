<template>
  <el-dialog v-model="userStore.dialog.viewUserVisible" title="Chi tiết người dùng" width="600" align-top>
    <el-form v-loading="userStore.loading.view" :model="userStore.data.viewUser">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.id" />
      </el-form-item>

      <el-form-item label="Tên người dùng" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.username" />
      </el-form-item>

      <el-form-item label="Email" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.email" />
      </el-form-item>

      <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.phone" />
      </el-form-item>

      <el-form-item label="Thông tin mô tả" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.description" />
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.status" />
      </el-form-item>

      <el-form-item label="Role" :label-width="formLabelWidth">
        <el-input multiple disabled v-model="userStore.data.viewUser.authorities" />
      </el-form-item>

      <el-form-item label="Tạo lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.createdAt" />
      </el-form-item>

      <el-form-item label="Chỉnh sửa lúc" :label-width="formLabelWidth">
        <el-input disabled v-model="userStore.data.viewUser.updatedAt" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const userStore = useUserStore()
</script>