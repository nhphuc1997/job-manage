<template>
  <el-dialog v-model="jobStore.dialog.createJobVisible" title="Khởi tạo công việc" width="800" align-top
    @close="jobStore.makeFreshJob">
    <el-form :model="jobStore.data.newJob">
      <el-form-item label="Tên công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.newJob.title" autocomplete="off" placeholder="Tên công việc" />
      </el-form-item>

      <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.newJob.imageUrl" autocomplete="off" placeholder="URL hình ảnh" />
      </el-form-item>

      <el-form-item label="Khu vực" :label-width="formLabelWidth">
        <el-select v-model="jobStore.data.newJob.areaId" placeholder="Khu vực">
          <el-option v-for="item in jobStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
        <el-date-picker style="width: 100%;" v-model="jobStore.data.newJob.expiredDate" type="datetime"
          placeholder="Ngày hết hạn" />
      </el-form-item>

      <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.newJob.summary" style="width: 100%" :rows="2" type="textarea"
          placeholder="Tóm tắt công việc" />
      </el-form-item>

      <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.newJob.description" style="width: 100%" :rows="2" type="textarea"
          placeholder="Mô tả công việc" />
      </el-form-item>

      <el-form-item label="Nội dung html" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.newJob.htmlContent" style="width: 100%" :rows="2" type="textarea"
          placeholder="Nội dung html" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="jobStore.dialog.createJobVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="jobStore.createJob">
          Tạo mới
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { Job } from '~/utils/interfaces';

const formLabelWidth = '140px'
const jobStore = useJobStore()
</script>