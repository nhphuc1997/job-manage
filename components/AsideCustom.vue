<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false">
    <el-menu-item @click="navigateTo('/areas')" :class="route.path === '/areas' ? 'is-active' : ''">
      <el-icon>
        <setting />
      </el-icon>
      <!-- <template #title>Khu vực</template> -->
    </el-menu-item>

    <el-menu-item @click="navigateTo('/jobs')" :class="route.path === '/jobs' ? 'is-active' : ''">
      <el-icon><icon-menu /></el-icon>
      <!-- <template #title>Công việc</template> -->
    </el-menu-item>

    <el-menu-item @click="navigateTo('/job-confirm')" :class="route.path === '/job-confirm' ? 'is-active' : ''">
      <el-icon>
        <TrendCharts />
      </el-icon>
      <!-- <template #title>Xác nhận</template> -->
    </el-menu-item>

    <el-menu-item @click="navigateTo('/sms')" :class="route.path === '/sms' ? 'is-active' : ''">
      <el-icon>
        <DataBoard />
      </el-icon>
      <!-- <template #title>SMS</template> -->
    </el-menu-item>

    <el-menu-item @click="navigateTo('/resumes')" :class="route.path === '/resumes' ? 'is-active' : ''">
      <el-icon>
        <list />
      </el-icon>
      <!-- <template #title>Hồ sơ</template> -->
    </el-menu-item>

    <el-menu-item @click="navigateTo('/users')" :class="route.path === '/users' ? 'is-active' : ''">
      <el-icon>
        <management />
      </el-icon>
      <!-- <template #title>Người dùng</template> -->
    </el-menu-item>
  </el-menu>


</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 50px;
  height: 100%;
}
</style>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting,
  List,
  Management,
  TrendCharts,
  DataBoard
} from '@element-plus/icons-vue'

const route = useRoute()

import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)

</script>