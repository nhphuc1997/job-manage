<template>
  <el-dialog v-model="productStore.dialog.createEntityVisible" title="Tạo danh mục" width="600" align-top>
    <el-form :model="productStore.data.newEntity">
      <el-form-item label="Tên" :label-width="formLabelWidth">
        <el-input v-model="productStore.data.newEntity.name" autocomplete="off" placeholder="Tên danh mục" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="productStore.dialog.createEntityVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="productStore.createEntity">
          Tạo mới
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const productStore = useProductStore()
</script>