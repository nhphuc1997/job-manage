<template>
  <el-dialog v-model="jobStore.dialog.viewJobVisible" title="Chi tiết công việc" width="800" align-center
    @close="jobStore.resetFilterUsersApply()">
    <el-tabs v-model="jobStore.data.detailTabPanelActive" @tab-click="tabChange">
      <el-tab-pane label="Thông tin" name="tab-first">
        <el-form :model="jobStore.data.viewJob">
          <el-form-item label="Id" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.id" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Tên công việc" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.title" autocomplete="off" />
          </el-form-item>

          <el-form-item label="URL hình ảnh" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.imageUrl" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Khu vực" :label-width="formLabelWidth">
            <el-select disabled v-model="jobStore.data.viewJob.areaId">
              <el-option v-for="item in jobStore.data.area" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth">
            <el-date-picker disabled style="width: 100%;" v-model="jobStore.data.viewJob.expiredDate" type="date" />
          </el-form-item>

          <el-form-item label="Tóm tắt công việc" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.summary" style="width: 100%" :rows="2" type="textarea" />
          </el-form-item>

          <el-form-item label="Mô tả công việc" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.description" style="width: 100%" :rows="2"
              type="textarea" />
          </el-form-item>

          <el-form-item label="Nội dung html" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.htmlContent" style="width: 100%" :rows="2"
              type="textarea" />
          </el-form-item>

          <el-form-item label="Tạo mới lúc" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.createdAt" style="width: 100%" :rows="2" />
          </el-form-item>

          <el-form-item label="Cập nhập lúc" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.updatedAt" style="width: 100%" :rows="2" />
          </el-form-item>

          <el-form-item label="Người tạo" :label-width="formLabelWidth">
            <el-input disabled v-model="jobStore.data.viewJob.createdBy" style="width: 100%" :rows="2" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Danh sách ứng tuyển" name="tab-second">
        <JobUserApplyFilter />
        <JobUserApplyData />
        <JobUserApplyPagination />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';

const formLabelWidth = '140'
const jobStore = useJobStore()

const tabChange = async (tab: TabsPaneContext) => {
  if (tab.props.name === 'tab-second') {
    await jobStore.fetchUsersApplyJob()
    jobStore.data.detailTabPanelActive = 'tab-second'
    return
  }

  jobStore.data.detailTabPanelActive = 'tab-first'
  jobStore.resetFilterUsersApply()
  return
}
</script>