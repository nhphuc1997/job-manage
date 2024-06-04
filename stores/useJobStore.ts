import type { Job } from "~/utils/interfaces"
import { doGET, doPOST } from "~/utils/apis"
import { dayjs } from "element-plus"

export const useJobStore = defineStore('useJobStore', {
  state: () => ({
    jobs: [] as Job[],
    page: 0,
    size: 10,
    totalElements: 0,
    currentPage: 0,
    optionsStatus: [
      {
        value: 'ACTIVE',
        label: 'active',
      },
      {
        value: 'INACTIVE',
        label: 'InActive',
      }
    ],
    searchTearm: '',
    status: '',
    area: '',
    optionsArea: [] as any,
    newJobObject: {} as Job,
    editJobObject: {} as Job,
    detailJobObject: {} as Job,
    dialogNewFormVisible: false,
    dialogEditFormVisible: false,
    dialogViewFormVisible: false,
  }),
  actions: {
    async fetchJobs() {
      const query: any = {
        page: this.page >= 1 ? this.page - 1 : 0,
        size: this.size ?? 10,
      }

      if (this.searchTearm !== '') {
        query['filter'] = `title~'*${this.searchTearm}*'`
      }

      if (this.status !== '') {
        query['filter'] = `status~'${this.status}'`
      }

      if (this.area !== '') {
        query['filter'] = `areaId~'${this.area}'`
      }

      const jobs: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, query)
      this.jobs = jobs?.data?.content
      this.size = jobs?.data?.size
      this.page = jobs?.data?.number
      this.totalElements = jobs?.data?.totalElements
      this.currentPage = this.page + 1
    },

    async fetchArea() {
      const areas: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/areas`)
      this.optionsArea = areas?.data.content
        .filter((area: any) => area.status === 'ACTIVE')
        .map((area: any) => ({ value: area.id, label: area.name }))
    },

    async createJob() {
      const payload = this.newJobObject
      payload['expiredDate'] = dayjs(payload['expiredDate']).format('DD/MM/YYYY hh:mm:ss').toString()
      const jobs: any = await doPOST(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, this.newJobObject)

      if (jobs.code === '00') {
        ElNotification({
          message: 'Tạo mới công việc thành công',
          type: 'success',
        })
        this.fetchJobs()
        this.resetNewJob()
        return
      }
      ElNotification({
        message: 'Tạo mới công việc thất bại',
        type: 'error',
      })
      this.resetNewJob()
    },

    resetNewJob() {
      this.newJobObject = {
        title: '',
        summary: '',
        imageUrl: '',
        areaId: '',
        expiredDate: '',
        description: '',
        htmlContent: ''
      }
    },

    async resetFilter() {
      this.searchTearm = ''
      this.status = ''
      this.area = ''
      await this.fetchJobs()
    },

    editJob(jobPayload: Job) {
      const expiredDate = jobPayload.expiredDate.split('/')
      const newDate = expiredDate[1] + '/' + expiredDate[0] + '/' + expiredDate[2];

      this.dialogEditFormVisible = true
      this.editJobObject = {
        id: jobPayload.id,
        title: jobPayload.title,
        summary: jobPayload.summary,
        imageUrl: jobPayload.imageUrl,
        areaId: jobPayload.areaId,
        expiredDate: dayjs(newDate).toISOString(),
        description: jobPayload.description,
        htmlContent: jobPayload.htmlContent,
        status: jobPayload.status
      }
    },

    async detailJob(job: Job) {
      const jobs: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${job.id}`)
      this.detailJobObject = jobs?.data
    }
  }
})