<template>
  <el-dialog v-model="jobConfirmStore.dialog.editJobConfirmVisible" title="Xác nhận công việc" width="600">
    <el-form :model="jobConfirmStore.data.editJobConfirm">
      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-text>{{ jobConfirmStore.data.editJobConfirm.id }}</el-text>
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-select v-model="jobConfirmStore.data.editJobConfirm.status">
          <el-option v-for="item in jobConfirmStore.data.optionsStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="Lý do" :label-width="formLabelWidth">
        <el-input v-model="jobConfirmStore.data.editJobConfirm.rejectComment" type="textarea" :row="2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="jobConfirmStore.dialog.editJobConfirmVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="jobConfirmStore.updateJobConfirmStatus">
          Cập nhập
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const jobConfirmStore = useJobConfirmStore()
</script>