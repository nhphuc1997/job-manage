<template>
  <el-dialog v-model="bannerStore.dialog.createEntityVisible" title="Tạo banner" width="600" align-top>
    <el-form :model="bannerStore.data.newEntity">
      <el-form-item label="Tên" :label-width="formLabelWidth">
        <el-upload :limit="1" list-type="picture-card" :auto-upload="false"
          :on-change="bannerStore.uploadFileThumbnail">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="bannerStore.dialog.createEntityVisible = false">Huỷ</el-button>
        <el-button type="primary" @click="bannerStore.createEntity">
          Tạo mới
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const formLabelWidth = '120px'
const bannerStore = useBannerStore()
</script>