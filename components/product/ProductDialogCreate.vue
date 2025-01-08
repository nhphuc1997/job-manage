<template>
  <el-dialog v-model="productStore.dialog.createEntityVisible" title="Tạo sản phẩm" width="600" align-top>
    <el-form :model="productStore.data.newEntity">
      <el-form-item label="Tên" :label-width="formLabelWidth">
        <el-input v-model="productStore.data.newEntity.name" autocomplete="off" placeholder="Tên sản phẩm" />
      </el-form-item>

      <el-form-item label="Giá" :label-width="formLabelWidth">
        <el-input v-model="productStore.data.newEntity.price" autocomplete="off" placeholder="Giá sản phẩm" />
      </el-form-item>

      <el-form-item label="Danh mục" :label-width="formLabelWidth">
        <el-select v-model="productStore.data.newEntity.categoryId" placeholder="Danh mục">
          <el-option v-for="item in categoryStore.data.list" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
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
const categoryStore = useCategoryStore()
</script>