<template>
  <!-- desktop -->
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="5">
        <el-input v-model="jobStore.filter.fulltext" @change="jobStore.fetchJobs" placeholder="Tìm kiếm"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobStore.filter.status" placeholder="Trạng thái" @change="jobStore.fetchJobs">
          <el-option v-for="item in jobStore.data.listStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select v-model="jobStore.filter.area" placeholder="Khu vực" @change="jobStore.fetchJobs">
          <el-option v-for="item in jobStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="7">
        <el-date-picker v-model="jobStore.filter.date" type="datetimerange" range-separator="Đến"
          start-placeholder="Ngày hết hạn" end-placeholder="Ngày hết hạn" style="width: 95%;"
          @change="jobStore.fetchJobs" format="DD-MM-YYYY HH:mm:ss" date-format="DD/MM/YYYY" time-format="HH:mm:ss" />
      </el-col>

      <el-col :span="3">
        <el-button @click="jobStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
          Xoá bộ lọc
        </el-button>
      </el-col>

      <el-col :span="3">
        <el-button @click="jobStore.dialog.createJobVisible = true" plain style="width: 100%;" type="success"
          :icon="ElIconWindPower">Tạo công việc</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- mobie -->
  <div class="create hidden-sm-and-up">
    <el-row :gutter="10" class="hidden-sm-and-up">
      <el-col :span="24" class="flex-end">
        <el-button type="primary" plain :icon="Filter" @click="jobStore.drawer.filterJob = true" />
      </el-col>
    </el-row>

    <el-drawer v-model="jobStore.drawer.filterJob" direction="btt">
      <el-row :gutter="10">
        <el-col :span="24" class="px-4">
          <el-input v-model="jobStore.filter.fulltext" @change="jobStore.fetchJobs" placeholder="Tìm kiếm"
            :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="12" class="px-4">
          <el-select v-model="jobStore.filter.status" placeholder="Trạng thái" @change="jobStore.fetchJobs">
            <el-option v-for="item in jobStore.data.listStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-select v-model="jobStore.filter.area" placeholder="Khu vực" @change="jobStore.fetchJobs">
            <el-option v-for="item in jobStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-button @click="jobStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
            Xoá bộ lọc
          </el-button>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-button @click="jobStore.dialog.createJobVisible = true" plain style="width: 100%;" type="success"
            :icon="ElIconWindPower">Tạo công việc</el-button>
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

const jobStore = useJobStore()
import { Filter } from '@element-plus/icons-vue'

</script>
