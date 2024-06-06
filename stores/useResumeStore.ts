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
      optionsStatus: [
        { label: 'Full updated', value: 'FULL_UPDATED' },
        { label: 'Need updated', value: 'NEED_UPDATE' },
      ]
    },
  }),
  actions: {
    async fetchResumes() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] = `fullName~'*${fulltext}*' or userName~'*${fulltext}*' or phoneNumber~'*${fulltext}*'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'*${this.filter.status}*'`

      const resumes: any = await doGET(`v1/api/job-manger/resumes`, query)
      if (resumes.code === '00') {
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
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchResumes()
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.status = ''
      await this.fetchResumes()
    },
  }
})