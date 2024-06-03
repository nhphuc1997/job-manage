<template>
  <div class="common-layout">
    <el-container>
      <el-header class="section-header">
        <AppHeader />
      </el-header>
      <el-container class="section-container">

        <el-aside width="200px">
          <AsideCustom />
        </el-aside>

        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
