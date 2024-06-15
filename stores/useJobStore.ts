import type { Area, Job, JobConfirm } from "~/utils/interfaces"
import { doGET, doMethod, doUpload } from "~/utils/apis"
import { stringToDate } from "~/utils"
import type { UploadFile } from "element-plus"

export const useJobStore = defineStore('useJobStore', {
  state: () => ({
    metadata: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    metadataJobAppy: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      fulltext: '',
      date: '',
      status: '',
      area: '',
    },
    filterUserApplyJob: {
      fulltext: '',
      status: '',
      date: ''
    },
    data: {
      loading: true,
      jobs: [] as Job[],
      usersApply: [] as JobConfirm[],
      viewJob: {} as Job,
      newJob: {} as Job,
      editAttrJob: {} as Job,
      editStatusJob: { id: '', status: '' },
      area: [] as any,
      detailTabPanelActive: 'tab-first',
      listStatus: [
        { value: 'ACTIVE', label: 'Đang hoạt động' },
        { value: 'INACTIVE', label: 'Không hoạt động' },
      ],
      listStatusJobConfirm: [
        { value: 'REJECT', label: 'Từ chối' },
        { value: 'APPROVED', label: 'Chấp thuận' },
        { value: 'PENDING', label: 'Chờ xử lí' },
      ],
      file: {} as UploadFile
    },
    dialog: {
      createJobVisible: false,
      editJobAttrVisible: false,
      editJobStatusVisible: false,
      viewJobVisible: false,
    },
    drawer: {
      filterJob: false
    }
  }),
  actions: {
    async fetchJobs() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
        sort: 'id,desc'
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] = `title~'*${fulltext}*' or summary~'*${fulltext}*'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'${this.filter.status}'`
      if (this.filter.area !== '') query['filter'] = `areaId~'${this.filter.area}'`
      if (this.filter.date !== '') {
        const fromDate = stringToDate(this.filter.date[0])
        const toDate = stringToDate(this.filter.date[1])
        query['filter'] = `expiredDate>:'${fromDate}' and expiredDate<:'${toDate}'`
      }

      const jobs: any = await doGET(`v1/api/job-manger/jobs`, query)
      if (jobs?.code === '00') {
        this.data.jobs = jobs?.data?.content
        this.metadata.size = jobs?.data?.size
        this.metadata.page = jobs?.data?.number
        this.metadata.totalElements = jobs?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async fetchUsersApplyJob() {
      this.data.loading = true
      const { id } = this.data.viewJob
      const query: any = {
        page: this.metadataJobAppy.page >= 1 ? this.metadataJobAppy.page - 1 : 0,
        size: this.metadataJobAppy.size ?? 10,
        sort: 'id,desc',
        filter: `jobId:'${id}'`
      }

      if (this.filterUserApplyJob.fulltext !== '') {
        const fulltext = this.filterUserApplyJob.fulltext
        query['filter'] += `and (employeeName~'*${fulltext}*' or userPhone~'*${fulltext}*')`
      }
      if (this.filterUserApplyJob.status !== '') {
        query['filter'] += `and (status~'${this.filterUserApplyJob.status}')`
      }
      if (this.filterUserApplyJob.date !== '') {
        const fromDate = stringToDate(this.filterUserApplyJob.date[0])
        const toDate = stringToDate(this.filterUserApplyJob.date[1])
        query['filter'] += `and (createdAt>:'${fromDate}' and createdAt<:'${toDate}')`
      }

      const jobsConfirm = await doGET('v1/api/job-manger/jobConfirm', query)
      if (jobsConfirm?.code === '00') {
        this.data.usersApply = jobsConfirm?.data?.content
        this.metadataJobAppy.size = jobsConfirm?.data?.size
        this.metadataJobAppy.page = jobsConfirm?.data?.number
        this.metadataJobAppy.totalElements = jobsConfirm?.data?.totalElements
        this.metadataJobAppy.currentPage = this.metadataJobAppy.page + 1
        this.data.loading = false
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      this.data.loading = false
      return
    },
    async fetchArea() {
      const areas: any = await doGET(`v1/api/job-manger/areas`)
      if (areas.code === '00') {
        this.data.area = areas?.data.content
          .filter((area: any) => area.status === 'ACTIVE')
          .map((area: any) => ({ value: area.id, label: area.name }))
      }
    },
    async openDialogEditJobStatus(row: any) {
      const { id } = row
      this.dialog.editJobStatusVisible = true
      const job: any = await doGET(`v1/api/job-manger/jobs/${id}`)
      this.data.editStatusJob = {
        id: job.data.id,
        status: job.data.status,
      }
    },
    async openDialogEditJobAttr(row: any) {
      const { id } = row
      this.dialog.editJobAttrVisible = true
      const job: any = await doGET(`v1/api/job-manger/jobs/${id}`)
      const area: Area[] = this.data.area
      const currentArea = area.find(item => item.id === job.data['areaId']) || { name: 'n/a' }

      this.data.editAttrJob = job.data
      this.data.editAttrJob['expiredDate'] = dateFromString(job.data['expiredDate'])
      this.data.editAttrJob['areaName'] = currentArea.name
    },
    async openDialogViewJob(row: any) {
      this.dialog.viewJobVisible = true
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/jobs/${id}`)
      this.data.viewJob = job.data
    },
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchJobs()
    },
    async paginationUserApplySizeChange(size: number) {
      this.metadataJobAppy.size = size
      await this.fetchUsersApplyJob()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchJobs()
    },
    async paginationUserApplyPageChange(page: number) {
      this.metadataJobAppy.page = page
      this.metadataJobAppy.currentPage - 1
      await this.fetchUsersApplyJob()
    },
    async createJob() {
      const payload = this.data.newJob
      payload['expiredDate'] = stringToDate(payload['expiredDate'])
      const jobs: any = await doMethod(`v1/api/job-manger/jobs`, this.data.newJob, 'POST')
      if (jobs.code === '00') {
        ElNotification({ message: 'Tạo mới công việc thành công', type: 'success' })
        this.data.newJob = {} as Job
        this.dialog.createJobVisible = false
        await this.fetchJobs()
        return
      }

      if (jobs.code === '100') {
        ElNotification({ message: 'Tên công việc đã tồn tại, vui lòng kiểm tra lại thông tin', type: 'error' })
        this.data.newJob = {} as Job
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn', type: 'error' })
      this.data.newJob = {} as Job
      return
    },
    async editAttrJob() {
      const editAttrJob = this.data.editAttrJob
      const { id, title, summary, description, htmlContent, imageUrl, areaId, expiredDate } = editAttrJob
      const payload = {
        title,
        summary,
        description,
        htmlContent,
        imageUrl,
        areaId,
        expiredDate: stringToDate(editAttrJob.expiredDate),
      }

      const job: any = await doMethod(`v1/api/job-manger/jobs/${id}`, payload, 'PUT')
      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa công việc thành công', type: 'success' })
        this.data.editAttrJob = {} as Job
        this.dialog.editJobAttrVisible = false
        await this.fetchJobs()
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn', type: 'error' })
      return
    },
    async editStatusJob() {
      const { id, status } = this.data.editStatusJob
      const job: any = await doMethod(`v1/api/job-manger/jobs/${id}`, { status: status }, 'PATCH')
      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa trạng thái công việc thành công', type: 'success' })
        this.data.editAttrJob = {} as Job
        this.dialog.editJobStatusVisible = false
        await this.fetchJobs()
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn', type: 'error' })
      return
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.date = ''
      this.filter.status = ''
      this.filter.area = ''
      await this.fetchJobs()
    },
    async resetFilterUsersApply() {
      this.filterUserApplyJob.fulltext = ''
      this.filterUserApplyJob.date = ''
      this.filterUserApplyJob.status = ''
      this.data.detailTabPanelActive = 'tab-first'
      await this.fetchUsersApplyJob()
    },
    makeFreshJob() {
      this.data.newJob = {} as Job
    },
    removeFile() {
      this.data.file = {} as UploadFile
      this.data.newJob.imageUrl = ''
    },
    async uploadFile(file: any) {
      let data = new FormData()
      data.append('file', file.raw)
      const fileUpload = await doUpload('v1/api/job-manger/document/uploads', data)
      if (fileUpload.code === '00') {
        ElMessage({ message: 'Upload hình ảnh thành công', type: 'success', plain: true })
        this.data.newJob.imageUrl = fileUpload.data
        return
      }
    },
  }
})
