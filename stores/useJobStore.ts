import type { Job } from "~/utils/interfaces"
import { doGET, doPOST, doPUT } from "~/utils/apis"
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
      search: '',
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
      }
      if (this.filter.search !== '') {
        query['filter'] = `title~'*${this.filter.search}*'`
      }
      if (this.filter.status !== '') {
        query['filter'] = `status~'${this.filter.status}'`
      }
      if (this.filter.area !== '') {
        query['filter'] = `areaId~'${this.filter.area}'`
      }
      const jobs: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, query)
      this.data.jobs = jobs?.data?.content
      this.metadata.size = jobs?.data?.size
      this.metadata.page = jobs?.data?.number
      this.metadata.totalElements = jobs?.data?.totalElements
      this.metadata.currentPage = this.metadata.page + 1
    },
    async fetchArea() {
      const areas: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/areas`)
      this.data.area = areas?.data.content
        .filter((area: any) => area.status === 'ACTIVE')
        .map((area: any) => ({ value: area.id, label: area.name }))
    },
    async openDialogEditJobStatus(row: any) {
      const { id } = row
      this.dialog.editJobStatusVisible = true
      const job: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`)
      this.data.editStatusJob = {
        id: job.data.id,
        status: job.data.status,
      }
    },
    async openDialogEditJobAttr(row: any) {
      const { id } = row
      this.dialog.editJobAttrVisible = true
      const job: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`, this.data.editAttrJob)
      this.data.editAttrJob = job.data
    },
    async openDialogViewJob(row: any) {
      this.dialog.viewJobVisible = true
      const { id } = row
      const job: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`)
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
      payload['expiredDate'] = dayjs(payload['expiredDate']).format('DD/MM/YYYY hh:mm:ss').toString()
      const jobs: any = await doPOST(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, this.data.newJob)
      if (jobs.code === '00') {
        ElNotification({ message: 'Tạo mới công việc thành công', type: 'success' })
        return
      } else {
        ElNotification({ message: 'Tạo mới công việc thất bại', type: 'error', })
      }
      this.fetchJobs()
      this.data.newJob = {} as Job
    },
    async editAttrJob() {
      const payload = this.data.editAttrJob
      const { id } = payload
      delete payload['id']
      delete payload['status']
      payload['expiredDate'] = stringToDate(payload['expiredDate'])
      await doPUT(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`, payload)
    },
    async editStatusJob() {
      const { id, status } = this.data.editStatusJob
      await doPUT(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`, { status })
    }
  }
})