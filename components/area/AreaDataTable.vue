<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="areaStore.data.areas" style="width: 100%" :border="true"
      height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="code" label="Code" sortable />
      <el-table-column prop="name" label="Tên" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable width="200">
        <template #default="scope">
          <el-row>
            <el-col :span="12">
              <el-button v-if="scope.row.status === 'ACTIVE'" type="success" size="small" plain
                :icon="ElIconWarningFilled" disabled>
                {{ String(scope.row.status).toLowerCase() }}
              </el-button>

              <el-button v-else type="info" size="small" plain :icon="ElIconWarnTriangleFilled" disabled>
                {{ String(scope.row.status).toLowerCase() }}
              </el-button>
            </el-col>

            <el-col :span="12">
              <el-button type="primary" :icon="ElIconEditPen" size="small" plain
                @click="areaStore.openDialogEditJobStatus(scope.row)" />
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