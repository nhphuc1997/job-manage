<template>
  <el-dialog v-model="smsStore.dialog.viewSmsVisible" title="Chi tiết sms" width="600">
    <el-form :model="smsStore.data.viewSms">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.id" />
      </el-form-item>

      <el-form-item label="userId" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.userId" />
      </el-form-item>

      <el-form-item label="userName" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.userName" />
      </el-form-item>

      <el-form-item label="content" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.content" type="textarea" :rows="4" />
      </el-form-item>

      <el-form-item label="createdDate" :label-width="formLabelWidth">
        <el-input disabled v-model="smsStore.data.viewSms.createdDate" />
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const smsStore = useSmsStore()
</script>