<template>
  <el-dialog v-model="areaStore.dialog.viewAreaVisible" title="Chi tiết khu vực" width="600" align-top>
    <el-form v-loading="areaStore.data.loadingView" :model="areaStore.data.viewArea">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="areaStore.data.viewArea.id" />
      </el-form-item>

      <el-form-item label="Mã khu vực" :label-width="formLabelWidth">
        <el-input disabled v-model="areaStore.data.viewArea.code" />
      </el-form-item>

      <el-form-item label="Tên khu vực" :label-width="formLabelWidth">
        <el-input disabled v-model="areaStore.data.viewArea.name" />
      </el-form-item>

      <el-form-item label="Trạng thái" :label-width="formLabelWidth">
        <el-input disabled v-model="areaStore.data.viewArea.status" />
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const areaStore = useAreaStore()
</script>