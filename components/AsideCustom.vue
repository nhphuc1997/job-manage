<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false">
    <el-menu-item index="2" @click="navigateTo('/areas')">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Khu vực</template>
    </el-menu-item>

    <el-menu-item index="3" @click="navigateTo('/jobs')">
      <el-icon><icon-menu /></el-icon>
      <template #title>Công việc</template>
    </el-menu-item>

    <el-menu-item index="4" @click="navigateTo('/sms')">
      <el-icon>
        <list />
      </el-icon>
      <template #title>SMS</template>
    </el-menu-item>

    <el-menu-item index="5" @click="navigateTo('/resumes')">
      <el-icon>
        <list />
      </el-icon>
      <template #title>Hồ sơ</template>
    </el-menu-item>

    <el-menu-item index="6" @click="navigateTo('/job-confirm')">
      <el-icon>
        <management />
      </el-icon>
      <template #title>Xác nhận công việc</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting,
  List,
  Management
} from '@element-plus/icons-vue'

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
