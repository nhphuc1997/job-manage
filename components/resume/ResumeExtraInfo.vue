<template>
  <el-descriptions :column="3" size="small">
    <el-descriptions-item label="Tạo lúc">
      <el-tag>{{ resumeStore.data.certs.EXTRA_INFO.createdDate }}</el-tag>
    </el-descriptions-item>

    <el-descriptions-item label="Tạo bởi">
      <el-tag>{{ resumeStore.data.certs.EXTRA_INFO.createdBy }}</el-tag>
    </el-descriptions-item>

    <el-descriptions-item label="Trạng thái">
      <el-tag type="success">{{ resumeStore.data.certs.EXTRA_INFO.status }}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
const resumeStore = useResumeStore()
</script>