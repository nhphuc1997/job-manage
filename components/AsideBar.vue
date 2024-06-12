<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false">
    <el-menu-item @click="navigateTo('/areas')" :class="route.path === '/areas' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Khu vực" placement="right-start">
        <el-icon>
          <Setting />
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <el-menu-item @click="navigateTo('/jobs')" :class="route.path === '/jobs' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Công việc" placement="right-start">
        <el-icon>
          <IconMenu />
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <el-menu-item @click="navigateTo('/job-confirm')" :class="route.path === '/job-confirm' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Xác nhận" placement="right-start">
        <el-icon>
          <TrendCharts />
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <el-menu-item @click="navigateTo('/sms')" :class="route.path === '/sms' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="SMS" placement="right-start">
        <el-icon>
          <DataBoard />
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <el-menu-item @click="navigateTo('/resumes')" :class="route.path === '/resumes' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Hồ sơ" placement="right-start">
        <el-icon>
          <DataAnalysis />
        </el-icon>
      </el-tooltip>
    </el-menu-item>

    <el-menu-item @click="navigateTo('/users')" :class="route.path === '/users' ? 'is-active' : ''">
      <el-tooltip class="box-item" effect="light" content="Người dùng" placement="right-start">
        <el-icon>
          <UserFilled />
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
  Menu as IconMenu,
  Setting,
  TrendCharts,
  DataBoard,
  DataAnalysis,
  UserFilled
} from '@element-plus/icons-vue'

const route = useRoute()

</script>