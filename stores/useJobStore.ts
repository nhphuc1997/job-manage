import type { Job } from "~/utils/interfaces"
import { doGET, doPATCH, doPOST, doPUT } from "~/utils/apis"
import { dayjs } from "element-plus"

export const useJobStore = defineStore('useJobStore', {
  state: () => ({
    jobs: [] as Job[],
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
    optionsArea: [] as any,
    newJobObject: {} as Job,
    editJobObject: {} as Job,
    detailJobObject: {} as Job,
    dialogNewFormVisible: false,
    dialogEditFormVisible: false,
    dialogViewFormVisible: false,
    dialogEditStatusFormVisible: false,
    jobStatusEdit: '',

    // refactor
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
      editStatusJob: ''
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
      this.optionsArea = areas?.data.content
        .filter((area: any) => area.status === 'ACTIVE')
        .map((area: any) => ({ value: area.id, label: area.name }))
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

    resetEditJob() {
      this.newJobObject = {
        id: null,
        title: '',
        summary: '',
        imageUrl: '',
        areaId: '',
        expiredDate: '',
        description: '',
        htmlContent: '',
        status: ''
      }
    },

    async resetFilter() {
      this.filter.search = ''
      this.filter.date = ''
      this.filter.status = ''
      this.filter.area = ''
      await this.fetchJobs()
    },

    editJob(jobPayload: Job, kind: 'edit_job_attr' | 'edit_job_status') {
      if (kind === 'edit_job_status') {
        this.jobStatusEdit = jobPayload.status || 'INACTIVE'
        this.dialogEditStatusFormVisible = true
      }

      if (kind === 'edit_job_attr') {
        this.dialogEditFormVisible = true
      }

      const expiredDate = jobPayload.expiredDate.split('/')
      const newDate = expiredDate[1] + '/' + expiredDate[0] + '/' + expiredDate[2];
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

    async updateJob() {
      const payload = this.editJobObject
      const id = this.editJobObject.id
      delete payload['id']
      delete payload['status']
      payload['expiredDate'] = dayjs(this.editJobObject.expiredDate).format('DD/MM/YYYY hh:mm:ss').toString()
      console.log(JSON.stringify(payload));
      await doPUT(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${id}`, payload)
      this.dialogEditFormVisible = false
      await this.fetchJobs()
    },

    async editStatus() {
      const payload = this.editJobObject
      await doPATCH(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${payload.id}`, { status: this.jobStatusEdit })
      await this.fetchJobs()
      this.dialogEditStatusFormVisible = false
    },

    async detailJob(job: Job) {
      const jobs: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs/${job.id}`)
      this.detailJobObject = jobs?.data
    },


    // refactor
    openDialogEditJobStatus(row: any) {
      this.dialogEditStatusFormVisible = true
      // this.editJobStatusValue = row.status
    },
    openDialogEditJobAttr(row: any) {
      this.dialogEditFormVisible = true
      // this.editJobAttrValue = row
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
      const payload = this.newJobObject
      payload['expiredDate'] = dayjs(payload['expiredDate']).format('DD/MM/YYYY hh:mm:ss').toString()
      const jobs: any = await doPOST(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, this.newJobObject)

      if (jobs.code === '00') {
        ElNotification({ message: 'Tạo mới công việc thành công', type: 'success' })
        this.fetchJobs()
        this.data.newJob = {} as Job
        return
      }
      ElNotification({
        message: 'Tạo mới công việc thất bại',
        type: 'error',
      })
      this.resetNewJob()
    },
  }
})