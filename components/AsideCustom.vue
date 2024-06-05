<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false">
    <el-menu-item index="2" @click="navigateTo('/areas')">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Quản lí khu vực</template>
    </el-menu-item>

    <el-menu-item index="3" @click="navigateTo('/jobs')">
      <el-icon><icon-menu /></el-icon>
      <template #title>Quản lí công việc</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
