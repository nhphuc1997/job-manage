<template>
  <div class="infor">
    <el-table ref="tableRef" row-key="date" :data="jobStore.data.jobs" :border="true" max-height="500">
      <el-table-column prop="id" label="Id" sortable width="80" align="center" />
      <el-table-column prop="title" label="Tên công việc" sortable>
        <template #default="scope">
          <el-tooltip effect="dark" :content="scope.row.title" placement="top">
            <el-text truncated>{{ useCapitalize(scope.row.title) }}</el-text>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="Tóm tắt" sortable>
        <template #default="scope">
          <el-tooltip effect="dark" :content="scope.row.summary" placement="top">
            <el-text truncated>{{ useCapitalize(scope.row.summary) }}</el-text>
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
      <el-table-column prop="areaName" label="Khu vực" sortable />
      <el-table-column prop="expiredDate" label="Ngày hết hạn" sortable />
      <el-table-column prop="status" label="Trạng thái" sortable align="center" width="190">
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
                  @click="jobStore.openDialogEditJobStatus(scope.row)" />
              </div>
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