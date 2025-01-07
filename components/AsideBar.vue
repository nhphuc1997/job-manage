<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false">
    <el-menu-item @click="navigateTo('/users')" :class="route.path === '/category' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Danh mục" placement="right-start">
        <el-icon>
          <Switch />
        </el-icon>
      </el-tooltip>
    </el-menu-item>
  </el-menu>


</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 50px;
  height: 100%;
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item {
  padding-left: unset;
  padding-right: unset;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon {
  margin-right: unset;
}
</style>

<script lang="ts" setup>
import {
  Switch
} from '@element-plus/icons-vue'

const route = useRoute()
</script>