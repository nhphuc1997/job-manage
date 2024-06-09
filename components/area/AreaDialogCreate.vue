<template>
  <el-dialog v-model="areaStore.dialog.createAreaVisible" title="Khởi tạo khu vực" width="600" align-top>
    <el-form :model="areaStore.data.newArea">
      <el-form-item label="Tên" :label-width="formLabelWidth">
        <el-input v-model="areaStore.data.newArea.name" autocomplete="off" placeholder="Tên khu vực" />
      </el-form-item>

      <el-form-item label="Mã" :label-width="formLabelWidth">
        <el-input v-model="areaStore.data.newArea.code" autocomplete="off" placeholder="Mã khu vực" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="areaStore.dialog.createAreaVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="areaStore.createJob">
          Tạo mới
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const areaStore = useAreaStore()
</script>