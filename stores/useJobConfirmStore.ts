import type { Job, JobConfirm, Resume } from "~/utils/interfaces"
import { doGET, doMethod } from "~/utils/apis"

export const useJobConfirmStore = defineStore('useJobConfirmStore', {
  state: () => ({
    metadata: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      fulltext: '',
      status: ''
    },
    data: {
      // loading: false,
      jobConfirm: [] as JobConfirm[],
      viewJobConfirm: {} as JobConfirm,
      viewJob: {} as Job,
      viewResume: {} as Resume,
      detailTabPanelActive: 'tab-first',
      editJobConfirm: {
        id: '',
        rejectComment: '',
        status: ''
      },
      optionsForFilterStatus: [
        { label: 'Chấp thuận', value: 'APPROVED' },
        { label: 'Từ chối', value: 'REJECT' },
        { label: 'Chờ xử lí', value: 'PENDING' },
      ],
      optionsForEditStatus: [
        { label: 'Từ chối', value: 'REJECT' },
      ],
      certs: {
        HEALTH_CERT: [] as Array<any>,
        ID_FRONT: [] as Array<any>,
        ID_PHOTO_CC: [] as Array<any>,
        TPS2: [] as Array<any>,
        ID_BACK: [] as Array<any>,
        PASSPORT: [] as Array<any>,
        OTHER: [] as Array<any>,
        EXTRA_INFO: {} as any
      }
    },
    dialog: {
      viewJobConfirmVisible: false,
      editJobConfirmVisible: false,
    },
    drawer: {
      filterJobConfirm: false
    },
    loading: {
      view: false
    }
  }),
  actions: {
    async fetchJobConfirm() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
        sort: 'id,desc'
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] =
          `jobTitle~'*${fulltext}*' or jobSummary~'*${fulltext}*' or userPhone~'*${fulltext}*' or employeeName~'*${fulltext}*'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'${this.filter.status}'`

      const jobConfirm: any = await doGET(`v1/api/job-manger/jobConfirm`, query)
      if (jobConfirm?.code === '00') {
        this.data.jobConfirm = jobConfirm?.data?.content
        this.metadata.size = jobConfirm?.data?.size
        this.metadata.page = jobConfirm?.data?.number
        this.metadata.totalElements = jobConfirm?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async openDialogView(row: any) {
      this.dialog.viewJobConfirmVisible = true
      this.data.certs = {
        HEALTH_CERT: [],
        ID_FRONT: [],
        ID_PHOTO_CC: [],
        TPS2: [],
        ID_BACK: [],
        PASSPORT: [],
        OTHER: [],
        EXTRA_INFO: {}
      }
      this.data.detailTabPanelActive = 'tab-first'
      this.loading.view = true
      const { id } = row
      const jobConfirm: any = await doGET(`v1/api/job-manger/jobConfirm/${id}`)

      if (jobConfirm?.code === '00') {
        const { jobId, resumeId } = jobConfirm.data
        const job: any = await doGET(`v1/api/job-manger/jobs/${jobId}`)
        const resume: any = await doGET(`v1/api/job-manger/resumes/${resumeId}`)

        const photos = resume.data.photos
        const keys: any = ['HEALTH_CERT', 'ID_FRONT', 'ID_BACK', 'ID_PHOTO_CC', 'PASSPORT', 'TPS2', 'OTHER']
        keys.map((key: 'HEALTH_CERT' | 'ID_FRONT' | 'ID_BACK' | 'ID_PHOTO_CC' | 'PASSPORT' | 'TPS2' | 'OTHER') => {
          this.data.certs[key] = photos
            .filter((photo: Record<string, any>) => photo.resumeType === key)
            .map((photo: Record<string, any>) => photo.url)
        })

        this.data.viewJobConfirm = jobConfirm.data
        this.data.viewJob = job.data
        this.data.viewResume = resume.data
        this.loading.view = false
        return
      }

      this.loading.view = false
    },
    async openDialogEdit(row: any) {
      this.dialog.editJobConfirmVisible = true
      const { id } = row
      this.data.editJobConfirm.id = id
      this.data.editJobConfirm.status = 'REJECT'
    },
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchJobConfirm()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchJobConfirm()
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.status = ''
      await this.fetchJobConfirm()
    },
    async updateJobConfirmStatus() {
      const { status, rejectComment, id } = this.data.editJobConfirm
      const jobConfirm: any = await doMethod(`v1/api/job-manger/jobConfirm/${id}`, { status, rejectComment }, 'PUT')

      if (jobConfirm.code === '00') {
        ElNotification({ message: 'Cập nhập trạng thái xác nhận công việc thành công', type: 'success' })
        this.dialog.editJobConfirmVisible = false
        this.data.editJobConfirm = { id: '', rejectComment: '', status: '' }
        await this.fetchJobConfirm()
        return
      }

      if (jobConfirm.code === '520') {
        ElNotification({ message: 'Công việc không thể chuyển trạng thái mới', type: 'info' })
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async updateApproveJob(row: any) {
      const { id } = row
      const jobConfirm: any = await doMethod(`v1/api/job-manger/jobConfirm/${id}`, { status: 'APPROVED' }, 'PUT')

      if (jobConfirm.code === '00') {
        ElNotification({ message: 'Cập nhập trạng thái xác nhận công việc thành công', type: 'success' })
        this.dialog.editJobConfirmVisible = false
        this.data.editJobConfirm = { id: '', rejectComment: '', status: '' }
        await this.fetchJobConfirm()
        return
      }

      if (jobConfirm.code === '520') {
        ElNotification({ message: 'Công việc không thể chuyển trạng thái mới', type: 'info' })
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    }
  }
})