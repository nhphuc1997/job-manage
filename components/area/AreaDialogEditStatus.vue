<template>
  <el-dialog v-model="areaStore.dialog.editAreaStatusVisible" title="Chỉnh sửa trạng thái công việc" width="600" align-top>
    <el-form :model="areaStore.data.editStatusArea">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-text type="info">{{ areaStore.data.editStatusArea.id }}</el-text>
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-select v-model="areaStore.data.editStatusArea.status">
          <template>
            <el-text>{{ areaStore.data.editStatusArea.status }}</el-text>
          </template>
          <el-option v-for="item in areaStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="areaStore.dialog.editAreaStatusVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="areaStore.editStatusArea">
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
