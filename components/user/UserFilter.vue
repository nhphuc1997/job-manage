<template>
  <div class="create hidden-sm-and-down">
    <el-row :gutter="12">
      <el-col :span="9">
        <el-input v-model="userStore.filter.fulltext" @change="userStore.fetchUsers"
          placeholder="Tìm kiếm tên, email, số điện thoại, thông tin mô tả của người dùng"
          :suffix-icon="ElIconSearch" />
      </el-col>

      <el-col :span="4">
        <el-select v-model="userStore.filter.role" placeholder="Vai trò" @change="userStore.fetchUsers">
          <el-option v-for="item in userStore.data.optionsForFilterRole" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select v-model="userStore.filter.status" placeholder="Trạng thái" @change="userStore.fetchUsers">
          <el-option v-for="item in userStore.data.optionsForFilterStatus" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-button @click="userStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">Xoá bộ
          lọc</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- mobie -->
  <div class="create hidden-sm-and-up">
    <el-row :gutter="10">
      <el-col :span="24" class="flex-end">
        <el-button type="primary" plain :icon="Filter" @click="userStore.drawer.filterUser = true" />
      </el-col>
    </el-row>

    <el-drawer v-model="userStore.drawer.filterUser" direction="btt">
      <el-row :gutter="12">
        <el-col :span="24" class="px-4">
          <el-input v-model="userStore.filter.fulltext" @change="userStore.fetchUsers"
            placeholder="Tìm kiếm tên, email, số điện thoại, thông tin mô tả của người dùng"
            :suffix-icon="ElIconSearch" />
        </el-col>

        <el-col :span="24" class="px-4">
          <el-select v-model="userStore.filter.role" placeholder="Vai trò" @change="userStore.fetchUsers">
            <el-option v-for="item in userStore.data.optionsForFilterRole" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-select v-model="userStore.filter.status" placeholder="Trạng thái" @change="userStore.fetchUsers">
            <el-option v-for="item in userStore.data.optionsForFilterStatus" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-col>

        <el-col :span="12" class="px-4">
          <el-button @click="userStore.resetFilter" plain style="width: 100%;" type="info" :icon="ElIconMug">
            Xoá bộ lọc</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>


<style lang="scss" scoped>
@import url('element-plus/theme-chalk/display.css');
@import url('/assets/styles/job.scss');

.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

<script lang="ts" setup>
import { Filter } from '@element-plus/icons-vue'
const userStore = useUserStore()
</script>
