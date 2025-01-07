<template>
  <div class="header">
    <el-row :gutter="8">
      <el-col :md="2" class=" hidden-sm-and-down" />

      <el-col :xs="24" :md="2">
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
    justify-content: center;
    align-items: center;
  }
}
</style>

<script lang="ts" setup>
import { TopRight, User, CaretTop } from '@element-plus/icons-vue';
import { ElLoading } from 'element-plus'

const loading = ElLoading.service({ lock: true })

const authStore = useAuthStore()
const areaStore = useAreaStore()
const jobStore = useJobStore()
const userStore = useUserStore()
const resumesStore = useResumeStore()
const smsStore = useSmsStore()
const jobConfirmStore = useJobConfirmStore()

const usernameCookie: any = useCookie('userName')
const userName = usernameCookie.value

areaStore.fetchAreas()
jobStore.fetchJobs()
userStore.fetchUsers()
resumesStore.fetchResumes()
smsStore.fetchSms()
jobConfirmStore.fetchJobConfirm()

loading.close()
</script>
