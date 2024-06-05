<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="areaStore.filter.search" @change="areaStore.fetchAreas" placeholder="Tìm kiếm"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="6">
        <el-date-picker v-model="areaStore.filter.date" type="daterange" range-separator="Đến"
          start-placeholder="Ngày bắt đầu" end-placeholder="Ngày kết thúc" style="width: 95%;" />
      </el-col>

      <el-col :span="3">
        <el-select v-model="areaStore.filter.status" placeholder="Trạng thái" @change="areaStore.fetchAreas">
          <el-option v-for="item in areaStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select v-model="areaStore.filter.area" placeholder="Khu vực" @change="areaStore.fetchAreas">
          <el-option v-for="item in areaStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="areaStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>

      <el-col :span="3">
        <el-button @click="areaStore.dialog.createAreaVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo công việc</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const areaStore = useAreaStore()
</script>
