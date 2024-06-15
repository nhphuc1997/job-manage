<template>
  <div class="header">
    <el-row :gutter="8">
      <el-col :xs="24" :md="12" class="flex hidden-sm-and-down">
        <el-statistic :value="areaStore.metadata.totalElements">
          <template #title>
            <el-text size="small">Tổng khu vực</el-text>
            <el-icon style="vertical-align: -0.125em">
              <CaretTop style="color: green;" />
            </el-icon>
          </template>
        </el-statistic>
        <el-divider direction="vertical" />

        <el-statistic :value="jobStore.metadata.totalElements" class="">
          <template #title>
            <el-text size="small">Tổng công việc</el-text>
            <el-icon style="vertical-align: -0.125em">
              <CaretTop style="color: green;" />
            </el-icon>
          </template>
        </el-statistic>
        <el-divider direction="vertical" />

        <el-statistic :value="userStore.metadata.totalElements">
          <template #title>
            <el-text size="small">Tổng người dùng</el-text>
            <el-icon style="vertical-align: -0.125em">
              <CaretTop style="color: green;" />
            </el-icon>
          </template>
        </el-statistic>
        <el-divider direction="vertical" />

        <el-statistic :value="resumesStore.metadata.totalElements">
          <template #title>
            <el-text size="small">Tổng hồ sơ</el-text>
            <el-icon style="vertical-align: -0.125em">
              <CaretTop style="color: green;" />
            </el-icon>
          </template>
        </el-statistic>

      </el-col>

      <el-col :xs="24" :md="12">
        <div class="user-infor">
          <div class="avatar">
            <el-dropdown>
              <el-avatar style="border: 1px solid var(--el-menu-border-color);" shape="square"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="User" disabled>
                    {{ useCapitalize(userName) }}
                  </el-dropdown-item>
                </el-dropdown-menu>

                <el-dropdown-menu>
                  <el-dropdown-item :icon="TopRight" @click="authStore.doLogout">
                    Đăng xuất
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
@import url('element-plus/theme-chalk/display.css');

.header {
  .user-infor {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .avatar {
      padding: 4px 0px;
    }
  }

  .spacing-4 {
    padding: 0 4rem;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>

<script lang="ts" setup>
import { TopRight, User, CaretTop } from '@element-plus/icons-vue';

const authStore = useAuthStore()
const areaStore = useAreaStore()
const jobStore = useJobStore()
const userStore = useUserStore()
const resumesStore = useResumeStore()

const usernameCookie: any = useCookie('userName')
const userName = usernameCookie.value

jobStore.fetchJobs()
userStore.fetchUsers()
resumesStore.fetchResumes()
</script>
