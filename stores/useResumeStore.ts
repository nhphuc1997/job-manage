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
      name: '',
      phoneNumber: '',
      status: ''
    },
    data: {
      resumes: [] as Resume[],
    },
  }),
  actions: {
    async fetchResumes() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
      }
      if (this.filter.name !== '') {
        query['filter'] = `fullName~'*${this.filter.name}*'`
        query['filter'] = `userName~'*${this.filter.name}*'`
      }
      if (this.filter.phoneNumber !== '') query['filter'] = `phoneNumber~'*${this.filter.phoneNumber}*'`
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
      this.filter.name = ''
      this.filter.phoneNumber = ''
      this.filter.status = ''
      await this.fetchResumes()
    },
  }
})