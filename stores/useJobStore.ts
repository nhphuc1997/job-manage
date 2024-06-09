import type { Area, Job } from "~/utils/interfaces"
import { doGET, doMethod } from "~/utils/apis"
import { dayjs } from "element-plus"
import { stringToDate } from "~/utils"

export const useJobStore = defineStore('useJobStore', {
  state: () => ({
    metadata: {
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
    data: {
      jobs: [] as Job[],
      viewJob: {} as Job,
      newJob: {} as Job,
      editAttrJob: {} as Job,
      editStatusJob: { id: '', status: '' },
      area: [] as any,
      listStatus: [
        { value: 'ACTIVE', label: 'active' },
        { value: 'INACTIVE', label: 'in active' },
      ]
    },
    dialog: {
      createJobVisible: false,
      editJobAttrVisible: false,
      editJobStatusVisible: false,
      viewJobVisible: false,
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
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchJobs()
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
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn', type: 'error' })
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
  }
})