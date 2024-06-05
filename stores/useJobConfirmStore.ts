import type { Job, JobConfirm, Sms } from "~/utils/interfaces"
import { doGET, doPOST } from "~/utils/apis"
import { stringToDate } from "~/utils"

export const useJobConfirmStore = defineStore('useJobConfirmStore', {
  state: () => ({
    metadata: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      employeeName: '',
      userPhone: '',
      jobFilter: '',
      status: ''
    },
    data: {
      jobConfirm: [] as JobConfirm[],
      viewJobConfirm: {} as JobConfirm,
      optionsStatus: [
        { label: 'Chấp thuận', value: 'APPROVED' },
        { label: 'Từ chối', value: 'REJECT' },
        { label: 'Chờ xử lí', value: 'PENDING' },
      ]
    },
    dialog: {
      viewJobConfirmVisible: false,
    }
  }),
  actions: {
    async fetchJobConfirm() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
      }
      if (this.filter.employeeName !== '') query['filter'] = `employeeName~'*${this.filter.employeeName}*'`
      if (this.filter.userPhone !== '') query['filter'] = `userPhone~'*${this.filter.userPhone}*'`
      if (this.filter.jobFilter !== '') {
        query['filter'] = `jobTitle~'*${this.filter.jobFilter}*' or jobSummary~'*${this.filter.jobFilter}*'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'${this.filter.status}'`

      const jobConfirm: any = await doGET(`v1/api/job-manger/jobConfirm`, query)
      if (jobConfirm.code === '00') {
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
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/jobConfirm/${id}`)
      this.data.viewJobConfirm = job.data
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
      this.filter.employeeName = ''
      this.filter.userPhone = ''
      this.filter.jobFilter = ''
      this.filter.status = ''
      await this.fetchJobConfirm()
    },
  }
})