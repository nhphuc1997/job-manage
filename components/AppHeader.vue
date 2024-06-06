<template>
  <div class="header">
    <el-row :gutter="8">
      <el-col :span="12" :offset="12">
        <div class="user-infor">
          <div class="avatar">
            <el-avatar style="border: 1px solid var(--el-menu-border-color);" shape="square"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.header {
  .user-infor {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .avatar {
      padding: 4px 0px;
    }
  }
}
</style>
