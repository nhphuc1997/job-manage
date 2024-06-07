import type { Job, JobConfirm, Sms } from "~/utils/interfaces"
import { doGET, doMethod } from "~/utils/apis"
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
      fulltext: '',
      status: ''
    },
    data: {
      jobConfirm: [] as JobConfirm[],
      viewJobConfirm: {} as JobConfirm,
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
        { label: 'Chấp thuận', value: 'APPROVED' },
        { label: 'Từ chối', value: 'REJECT' },
      ]
    },
    dialog: {
      viewJobConfirmVisible: false,
      editJobConfirmVisible: false,
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
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/jobConfirm/${id}`)
      this.data.viewJobConfirm = job.data
    },
    async openDialogEdit(row: any) {
      this.dialog.editJobConfirmVisible = true
      const { id } = row
      this.data.editJobConfirm.id = id
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
      const job: any = await doMethod(`v1/api/job-manger/jobConfirm/${id}`, { status, rejectComment }, 'PUT')

      if (job.code === '00') {
        ElNotification({ message: 'Cập nhập trạng thái xác nhận công việc thành công', type: 'success' })
        this.dialog.editJobConfirmVisible = false
        this.data.editJobConfirm = { id: '', rejectComment: '', status: '' }
        await this.fetchJobConfirm()
        return
      }

      if (job.code === '520') {
        ElNotification({ message: 'Công việc không thể chuyển trạng thái mới', type: 'info' })
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    }
  }
})