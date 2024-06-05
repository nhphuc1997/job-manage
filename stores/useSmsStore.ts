import type { Job, Sms } from "~/utils/interfaces"
import { doGET, doPOST } from "~/utils/apis"
import { stringToDate } from "~/utils"

export const useSmsStore = defineStore('useSmsStore', {
  state: () => ({
    metadata: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      userId: '',
      content: '',
      userName: '',
      createdDate: ''
    },
    data: {
      sms: [] as Sms[],
      viewSms: {} as Sms,
      newSms: {} as Sms,
    },
    dialog: {
      createSmsVisible: false,
      viewSmsVisible: false,
    }
  }),
  actions: {
    async fetchSms() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
      }
      if (this.filter.content !== '') query['filter'] = `content~'*${this.filter.content}*'`
      if (this.filter.userName !== '') query['filter'] = `userName~'*${this.filter.userName}*'`
      if (this.filter.createdDate !== '') query['filter'] = `createdDate~'*${this.filter.userName}*'` // TODO

      const sms: any = await doGET(`v1/api/job-manger/sms`, query)
      if (sms.code === '00') {
        this.data.sms = sms?.data?.content
        this.metadata.size = sms?.data?.size
        this.metadata.page = sms?.data?.number
        this.metadata.totalElements = sms?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async openDialogViewJob(row: any) {
      this.dialog.viewSmsVisible = true
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/sms/${id}`)
      this.data.viewSms = job.data
    },
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchSms()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchSms()
    },
    async createJob() {
      const { senderName, senderPhone, content, receivedDate } = this.data.newSms
      const sms: any = await doPOST(`v1/api/job-manger/sms`, { senderName, senderPhone, content, receivedDate })

      if (sms.code === '00') {
        ElNotification({ message: 'Tạo mới tin nhắn thành công', type: 'success' })
        this.data.newSms = {} as Sms
        this.dialog.createSmsVisible = false
        await this.fetchSms()
        return
      }
    },

    async resetFilter() {
      this.filter.userId = ''
      this.filter.content = ''
      this.filter.userName = ''
      this.filter.createdDate = ''
      await this.fetchSms()
    },
  }
})