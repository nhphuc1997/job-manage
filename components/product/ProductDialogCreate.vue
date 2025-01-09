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
        <el-select v-model="productStore.data.newEntity.categoryName" placeholder="Danh mục">
          <el-option v-for="item in categoryStore.data.list" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item label="Hình ảnh thumnail" :label-width="formLabelWidth">
        <el-upload :limit="1" list-type="picture-card" :auto-upload="false"
          :on-change="productStore.uploadFileThumbnail">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="Hình ảnh sản phẩm" :label-width="formLabelWidth">
        <el-upload :multiple="true" :limit="3" list-type="picture-card" :auto-upload="false"
          :on-change="productStore.uploadImages">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
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