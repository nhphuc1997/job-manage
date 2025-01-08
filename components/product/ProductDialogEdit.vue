<template>
  <el-dialog v-model="productStore.dialog.editEntityVisible" title="Chi tiết danh mục" width="600" align-top>
    <el-form v-loading="productStore.loading.view" :model="productStore.data.viewEntity">

      <el-form-item label="Id" :label-width="formLabelWidth">
        <el-input disabled v-model="productStore.data.editEntity.id" />
      </el-form-item>

      <el-form-item label="Tên sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="productStore.data.editEntity.name" />
      </el-form-item>

      <el-form-item label="Giá sản phẩm" :label-width="formLabelWidth">
        <el-input v-model="productStore.data.editEntity.price" />
      </el-form-item>

      <el-form-item label="Danh mục" :label-width="formLabelWidth">
        <el-select v-model="productStore.data.newEntity.categoryId" placeholder="Danh mục">
          <el-option v-for="item in categoryStore.data.list" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="productStore.dialog.editEntityVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="productStore.editEntity">
          Chỉnh sửa
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '140px'
const productStore = useProductStore()
const categoryStore = useCategoryStore()
categoryStore.fetchEntity()
</script>