<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="jobStore.data.jobs" style="width: 100%" :border="true" height="600">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="title" label="Tên" sortable />
      <el-table-column prop="summary" label="Tóm tắt" sortable>
        <template #default="scope">
          <el-tooltip effect="dark" :content="scope.row.summary" placement="top">
            <el-text truncated>{{ scope.row.summary }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="imageUrl" label="Hình ảnh Url" sortable align="center">
        <template #default="scope">
          <el-button size="small" type="primary" round plain :icon="TopRight" @click="redirectTo(scope.row.imageUrl)">
            Link
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="areaId" label="Khu vực" sortable align="center" />
      <el-table-column prop="expiredDate" label="Ngày hết hạn" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable align="center">
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
                @click="jobStore.openDialogEditJobStatus(scope.row)" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150">
        <template #default="scope">
          <el-button :icon="ElIconEdit" size="small" @click="jobStore.openDialogEditJobAttr(scope.row)" />
          <el-button plain :icon="ElIconView" size="small" @click="jobStore.openDialogViewJob(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { TopRight } from '@element-plus/icons-vue';
const jobStore = useJobStore()
</script>