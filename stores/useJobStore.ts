import type { Job } from "~/utils/interfaces"
import { doGET } from "~/utils/apis"

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
    dialogNewFormVisible: false,
    editJobObject: {} as Job,
    dialogEditFormVisible: false,
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
      console.log(JSON.stringify(this.newJobObject));
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

    editJob(jobPayload: Job) {
      this.dialogEditFormVisible = true
      this.editJobObject = {
        id: jobPayload.id,
        title: jobPayload.title,
        summary: jobPayload.summary,
        imageUrl: jobPayload.imageUrl,
        areaId: jobPayload.areaId,
        expiredDate: jobPayload.expiredDate,
        description: jobPayload.description,
        htmlContent: jobPayload.htmlContent,
        status: jobPayload.status
      }
    }
  }
})