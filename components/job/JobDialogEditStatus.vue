<template>
  <el-dialog v-model="jobStore.dialog.editJobStatusVisible" title="Chỉnh sửa trạng thái công việc" width="500"
    align-top>
    <el-form :model="jobStore.data.editStatusJob">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-text type="info">{{ jobStore.data.editStatusJob.id }}</el-text>
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-select v-model="jobStore.data.editStatusJob.status">
          <template>
            <el-text>{{ jobStore.data.editStatusJob.status }}</el-text>
          </template>
          <el-option v-for="item in jobStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="jobStore.dialog.editJobStatusVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="jobStore.editStatusJob">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const jobStore = useJobStore()
</script>
