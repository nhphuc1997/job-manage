<template>
  <el-dialog v-model="areaStore.dialog.editAreaAttrVisible" title="Chỉnh sửa công việc" width="600" align-top>
    <el-form v-loading="areaStore.loading.edit" :model="areaStore.data.editAttrArea">
      <el-form-item label="Tên công việc" :label-width="formLabelWidth">
        <el-input v-model="areaStore.data.editAttrArea.name" autocomplete="off" placeholder="Tên công việc" />
      </el-form-item>

      <el-form-item label="Mã công việc" :label-width="formLabelWidth">
        <el-input v-model="areaStore.data.editAttrArea.code" autocomplete="off" placeholder="Mã công việc" />
      </el-form-item>


    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="areaStore.dialog.editAreaAttrVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="areaStore.editAttrArea">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const areaStore = useAreaStore()
</script>
