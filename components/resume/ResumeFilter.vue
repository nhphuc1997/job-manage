<template>
  <div class="create">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-input v-model="resumeStore.filter.name" @change="resumeStore.fetchResumes" placeholder="Tìm kiếm"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="4">
        <el-select v-model="resumeStore.filter.status" placeholder="Trạng thái" @change="resumeStore.fetchResumes">
          <el-option v-for="item in resumeStore.data.optionsStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="resumeStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const resumeStore = useResumeStore()
</script>
