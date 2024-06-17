<template>
  <el-dialog v-model="resumeStore.dialog.viewResumeVisible" title="Chi tiết hồ sơ" width="800" align-top
    @close="resumeStore.resetTab">
    <el-tabs v-loading="resumeStore.loading.view" v-model="resumeStore.data.detailTabPanelActive">
      <el-tab-pane label="Thông tin" name="tab-first">
        <el-form :model="resumeStore.data.viewResume">
          <el-form-item label="Id" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.id" />
          </el-form-item>

          <el-form-item label="Tên người dùng" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.userName" />
          </el-form-item>

          <el-form-item label="Tên đầy đủ" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.fullName" />
          </el-form-item>

          <el-form-item label="Số điện thoại" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.phoneNumber" />
          </el-form-item>

          <el-form-item label="Ngày sinh" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.dateOfBird" />
          </el-form-item>

          <el-form-item label="Địa chỉ" :label-width="formLabelWidth">
            <el-input disabled v-model="resumeStore.data.viewResume.address" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane :label="`Giấy tờ`" name="tab-second">
        <div class="collapse">
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template #title>
                <el-icon size="16">
                  <ElIconFiles />
                </el-icon>
                <el-badge type="primary" :value="1" :offset="[10, 15]">
                  <el-text class="text-intro">Ảnh chân dung</el-text>
                </el-badge>
              </template>

              <div class="flex">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <el-image class="image" :src="resumeStore.data.viewResume.profileUrl" :zoom-rate="1.2"
                      :max-scale="7" :min-scale="0.2" :initial-index="4" fit="cover"
                      :preview-src-list="[resumeStore.data.viewResume.profileUrl]" />
                  </el-col>
                  <el-col :span="20">
                    <el-descriptions :column="1" size="small">
                      <el-descriptions-item label="Tạo lúc">
                        <el-tag>{{ resumeStore.data.viewResume.createdAt }}</el-tag>
                      </el-descriptions-item>

                      <el-descriptions-item label="Tạo bởi">
                        <el-tag>{{ resumeStore.data.viewResume.createdBy }}</el-tag>
                      </el-descriptions-item>

                      <el-descriptions-item label="Chỉnh sửa">
                        <el-tag>{{ resumeStore.data.viewResume.updatedAt }}</el-tag>
                      </el-descriptions-item>

                      <el-descriptions-item label="Lần cuối chỉnh sửa bởi:">
                        <el-tag>{{ resumeStore.data.viewResume.lastModifiedBy }}</el-tag>
                      </el-descriptions-item>
                    </el-descriptions>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>

            <!-- Giấy tờ -->
            <el-collapse-item :name="item.key" v-for="item in KEYS_RESUME ">
              <template #title>
                <el-icon size="16">
                  <ElIconPlatform />
                </el-icon>
                <el-badge type="primary" :value="resumeStore.data.certs[item.key].length" :offset="[10, 15]">
                  <el-text class="text-intro">{{ item.name }}</el-text>
                </el-badge>
              </template>
              <div class="flex">
                <el-row :gutter="10">
                  <el-col :span="4" v-for="photo in resumeStore.data.certs[item.key]">
                    <el-image class="image" :src="photo" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                      :initial-index="4" fit="cover" :preview-src-list="[photo]" />
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<style lang="scss" scoped>
.text-intro {
  padding-left: 8px;
}

.image {
  width: 100%;
  height: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}

.flex {
  width: 100%;
}

.el-badge__content.is-fixed {
  top: 12px;
}
</style>

<script lang="ts" setup>
const formLabelWidth = '140px'
const resumeStore = useResumeStore()
</script>