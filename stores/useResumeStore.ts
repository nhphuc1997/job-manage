import type { Resume } from "~/utils/interfaces"
import { doGET } from "~/utils/apis"

export const useResumeStore = defineStore('useResumeStore', {
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
      resumes: [] as Resume[],
      viewResume: {} as Resume,
      optionsStatus: [
        { label: 'Thiếu thông tin bắt buộc', value: 'NEED_MANDATORY_INFO' },
        { label: 'Thiếu thông tin bổ sung', value: 'NEED_ADDITIONAL_INFO' },
        { label: 'Đủ thông tin', value: 'FULL_INFO' },
      ],
      detailTabPanelActive: 'tab-first',
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
      viewResumeVisible: false,
    },
    drawer: {
      filterResume: false
    }
  }),
  actions: {
    async fetchResumes() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
        sort: 'id,desc'
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] = `fullName~'*${fulltext}*' or userName~'*${fulltext}*' or phoneNumber~'*${fulltext}*'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'*${this.filter.status}*'`

      const resumes: any = await doGET(`v1/api/job-manger/resumes`, query)
      if (resumes?.code === '00') {
        this.data.resumes = resumes?.data?.content
        this.metadata.size = resumes?.data?.size
        this.metadata.page = resumes?.data?.number
        this.metadata.totalElements = resumes?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async openDialogView(row: any) {
      this.dialog.viewResumeVisible = true
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
      const { id } = row
      const resume: any = await doGET(`v1/api/job-manger/resumes/${id}`)
      if (resume?.code === '00') {
        this.data.viewResume = resume.data
        const photos = resume.data.photos

        this.data.certs.EXTRA_INFO = {
          createdDate: photos[0].createdDate,
          createdBy: photos[0].createdBy,
          status: photos[0].status,
        }

        const keys: any = ['HEALTH_CERT', 'ID_FRONT', 'ID_BACK', 'ID_PHOTO_CC', 'PASSPORT', 'TPS2', 'OTHER']
        keys.map((key: 'HEALTH_CERT' | 'ID_FRONT' | 'ID_BACK' | 'ID_PHOTO_CC' | 'PASSPORT' | 'TPS2' | 'OTHER') => {
          this.data.certs[key] = photos
            .filter((photo: Record<string, any>) => photo.resumeType === key)
            .map((photo: Record<string, any>) => photo.url)
        })
        return
      }
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchResumes()
    },
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchResumes()
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.status = ''
      await this.fetchResumes()
    },
    async resetTab() {
      this.data.detailTabPanelActive = 'tab-first'
    },
  }
})