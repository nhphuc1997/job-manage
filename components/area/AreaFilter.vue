<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="areaStore.filter.search" @change="areaStore.fetchAreas" placeholder="Tìm kiếm"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="4">
        <el-select v-model="areaStore.filter.status" placeholder="Trạng thái" @change="areaStore.fetchAreas">
          <el-option v-for="item in areaStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select v-model="areaStore.filter.code" placeholder="Khu vực" @change="areaStore.fetchAreas">
          <el-option v-for="item in areaStore.data.zones" :key="item.id" :label="item.name" :value="item.code" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="areaStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>

      <el-col :span="3" :offset="4">
        <el-button @click="areaStore.dialog.createAreaVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo khu vực</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const areaStore = useAreaStore()
areaStore.fetchAllZones()
</script>
