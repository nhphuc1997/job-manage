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
      fulltext: '',
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
      if (this.filter.fulltext !== '') {
        query['filter'] = `content~'*${this.filter.fulltext}*' or userName~'*${this.filter.fulltext}*'`
      }
      if (this.filter.createdDate !== '') {
        const fromDate = stringToDate(this.filter.createdDate[0])
        const toDate = stringToDate(this.filter.createdDate[1])
        query['filter'] = `createdDate:>'${fromDate}' and createdDate:>'${toDate}'`
      }

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
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.createdDate = ''
      await this.fetchSms()
    },
  }
})