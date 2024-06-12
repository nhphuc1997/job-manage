<template>
  <div class="">
    <el-drawer v-model="areaStore.drawer.filterArea" direction="btt">
      <el-row :gutter="4" class="hidden-sm-and-down">
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

<script lang="ts" setup>
const areaStore = useAreaStore()
</script>
