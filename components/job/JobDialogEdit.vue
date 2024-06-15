<template>
  <el-dialog v-model="jobStore.dialog.editJobAttrVisible" title="Chỉnh sửa công việc" width="800" align-top>
    <el-form :model="jobStore.data.editAttrJob">
      <el-form-item label="Tên công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.editAttrJob.title" autocomplete="off" placeholder="Tên công việc" />
      </el-form-item>

      <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.editAttrJob.imageUrl" autocomplete="off" placeholder="URL hình ảnh" disabled />
      </el-form-item>

      <el-form-item label="" :label-width="formLabelWidth">
        <el-upload v-model:file-list="jobStore.data.fileListEditJob" :limit="1" list-type="picture-card"
          :auto-upload="false" :on-remove="jobStore.removeFileEditJob" :on-change="jobStore.uploadFileEditJob">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="Khu vực" :label-width="formLabelWidth">
        <el-select v-model="jobStore.data.editAttrJob.areaId" placeholder="Khu vực">
          <el-option v-for="item in jobStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
        <el-date-picker style="width: 100%;" v-model="jobStore.data.editAttrJob.expiredDate" type="datetime"
          placeholder="Ngày hết hạn" format="DD/MM/YYYY HH:mm:ss" />
      </el-form-item>

      <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.editAttrJob.summary" style="width: 100%" :rows="2" type="textarea"
          placeholder="Tóm tắt công việc" />
      </el-form-item>

      <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.editAttrJob.description" style="width: 100%" :rows="2" type="textarea"
          placeholder="Mô tả công việc" />
      </el-form-item>

      <el-form-item label="Nội dung html" :label-width="formLabelWidth">
        <el-input v-model="jobStore.data.editAttrJob.htmlContent" style="width: 100%" :rows="2" type="textarea"
          placeholder="Mô tả công việc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="jobStore.dialog.editJobAttrVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="jobStore.editAttrJob">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'

const formLabelWidth = '140px'
const jobStore = useJobStore()

const fileList = [
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
]

</script>
