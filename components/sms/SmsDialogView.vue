<template>
  <el-dialog v-model="smsStore.dialog.viewSmsVisible" title="Chi tiết sms" width="600" align-top>
    <el-form :model="smsStore.data.viewSms">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.id" />
      </el-form-item>

      <el-form-item label="Tên người dùng" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.userName" />
      </el-form-item>

      <el-form-item label="Nội dung" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.content" type="textarea" :rows="4" />
      </el-form-item>

      <el-form-item label="Mgày tạo" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.createdDate" />
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const smsStore = useSmsStore()
</script>