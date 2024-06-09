<template>
  <div class="login-section">
    <div class="form-wrapper">
      <div class="form">

        <el-space direction="vertical" class="text-login">
          <el-text size="large">CMS</el-text>
        </el-space>

        <el-form v-model="authStore.data.login" label-position="left" label-width="auto">
          <el-form-item label="Tên đăng nhập">
            <el-input v-model="authStore.data.login.username" type="text" autocomplete="off" placeholder="Admin" />
          </el-form-item>

          <el-form-item label="Mật khẩu">
            <el-input v-model="authStore.data.login.password" type="password" autocomplete="off"
              placeholder="Aa@123456" />
          </el-form-item>

          <el-form-item class="submit-button">
            <div class="submit-button-wrapper">
              <el-button :disabled="authStore.data.login.username === '' || authStore.data.login.password === ''"
                size="default" type="primary" @click="authStore.doLogin" plain :icon="Connection">
                Đăng nhập
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('/assets/styles/auth.scss');
</style>

<script lang="ts" setup>
import { Connection } from '@element-plus/icons-vue';
definePageMeta({
  layout: 'auth',
  // middleware: ['login']
})

const authStore = useAuthStore()

</script>
