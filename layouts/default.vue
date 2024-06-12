<template>
  <div class="common-layout">
    <el-container>
      <el-header class="section-header">
        <AppHeader />
      </el-header>
      <el-container class="section-container">
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDrawer } from 'element-plus'

const visible = ref(false)
</script>
