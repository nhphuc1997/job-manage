<template>
  <!-- desktop -->
  <div class="create hidden-sm-and-down">
    <el-row :gutter="4" class="">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" class="px-4">
        <el-input v-model="areaStore.filter.fulltext" @change="areaStore.fetchAreas"
          placeholder="Tìm kiếm tên, mã khu vực" :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :xs="24" :sm="8" :md="3" :lg="3" class="px-4">
        <el-select v-model="areaStore.filter.status" placeholder="Trạng thái" @change="areaStore.fetchAreas">
          <el-option v-for="item in areaStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :xs="12" :sm="8" :md="3" :lg="3" class="px-4">
        <el-button @click="areaStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>

      <el-col :xs="12" :sm="8" :md="3" :lg="3" class="px-4">
        <el-button @click="areaStore.dialog.createAreaVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo khu vực</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- mobie -->
  <div class="create hidden-sm-and-up">
    <el-row :gutter="4" class="hidden-sm-and-up">
      <el-col :span="24" class="flex-end">
        <el-button type="primary" plain :icon="Filter" @click="areaStore.drawer.filterArea = true" />
      </el-col>
    </el-row>

    <el-drawer v-model="areaStore.drawer.filterArea" direction="btt">
      <el-row :gutter="4" class="">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" class="px-4">
          <el-input v-model="areaStore.filter.fulltext" @change="areaStore.fetchAreas"
            placeholder="Tìm kiếm tên, mã khu vực" :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :xs="24" :sm="8" :md="3" :lg="3" class="px-4">
          <el-select v-model="areaStore.filter.status" placeholder="Trạng thái" @change="areaStore.fetchAreas">
            <el-option v-for="item in areaStore.data.listStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :xs="12" :sm="8" :md="3" :lg="3" class="px-4">
          <el-button @click="areaStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
            lọc</el-button>
        </el-col>

        <el-col :xs="12" :sm="8" :md="3" :lg="3" class="px-4">
          <el-button @click="areaStore.dialog.createAreaVisible = true" plain style="width: 100%;" type="success"
            :icon="ElIconWindPower">Tạo khu vực</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@import url('element-plus/theme-chalk/display.css');
@import url('/assets/styles/job.scss');

.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

<script lang="ts" setup>
import { Filter } from '@element-plus/icons-vue'

const areaStore = useAreaStore()
areaStore.fetchAllZones()

</script>
