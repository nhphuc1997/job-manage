<template>
  <div class="create">
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
</template>

<script lang="ts" setup>
const userStore = useUserStore()
</script>
