<template>
  <div class="infor">
    <el-table :data="areaStore.data.areas" border max-height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="name" label="Tên" sortable />
      <el-table-column prop="code" label="Code" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable width="200">
        <template #default="scope">
          <el-row>
            <el-col :span="12">
              <div class="flex-start">
                <el-tag :type="scope.row.status === 'ACTIVE' ? 'success' : 'danger'" size="small">
                  {{ parseStatusV1(scope.row.status) }}
                </el-tag>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="flex-end">
                <el-button type="primary" :icon="ElIconEditPen" size="small" plain
                  @click="areaStore.openDialogEditJobStatus(scope.row)" />
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button :icon="ElIconEdit" size="small" @click="areaStore.openDialogEditJobAttr(scope.row)" />
          <el-button plain :icon="ElIconView" size="small" @click="areaStore.openDialogViewJob(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const areaStore = useAreaStore()
</script>