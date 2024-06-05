import type { Job } from "~/utils/interfaces"
import { doGET, doPATCH, doPOST, doPUT } from "~/utils/apis"
import { stringToDate } from "~/utils"

export const useAreaStore = defineStore('useAreaStore', {
  state: () => ({
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
      areas: [] as Job[],
      viewArea: {} as Job,
      newArea: {} as Job,
      editAttrArea: {} as Job,
      editStatusArea: { id: '', status: '' },
      area: [] as any,
      listStatus: [
        { value: 'ACTIVE', label: 'active' },
        { value: 'INACTIVE', label: 'in active' },
      ]
    },
    dialog: {
      createAreaVisible: false,
      editAreaAttrVisible: false,
      editAreaStatusVisible: false,
      viewAreaVisible: false,
    }
  }),
  actions: {
    async fetchJobs() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
      }
      if (this.filter.search !== '') query['filter'] = `title~'*${this.filter.search}*'`
      if (this.filter.status !== '') query['filter'] = `status~'${this.filter.status}'`
      if (this.filter.area !== '') query['filter'] = `areaId~'${this.filter.area}'`
      if (this.filter.date !== '') query['filter'] = `expiredDate`

      const areas: any = await doGET(`v1/api/job-manger/areas`, query)
      if (areas.code === '00') {
        this.data.areas = areas?.data?.content
        this.metadata.size = areas?.data?.size
        this.metadata.page = areas?.data?.number
        this.metadata.totalElements = areas?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async fetchArea() {
      const areas: any = await doGET(`v1/api/job-manger/areas`)
      if (areas.code === '00') {
        this.data.area = areas?.data.content
          .filter((area: any) => area.status === 'ACTIVE')
          .map((area: any) => ({ value: area.id, label: area.name }))
      }
    },
    async openDialogEditJobStatus(row: any) {
      const { id } = row
      this.dialog.editAreaStatusVisible = true
      const job: any = await doGET(`v1/api/job-manger/areas/${id}`)
      this.data.editStatusArea = {
        id: job.data.id,
        status: job.data.status,
      }
    },
    async openDialogEditJobAttr(row: any) {
      const { id } = row
      this.dialog.editAreaAttrVisible = true
      const job: any = await doGET(`v1/api/job-manger/areas/${id}`)
      this.data.editAttrArea = job.data
    },
    async openDialogViewJob(row: any) {
      this.dialog.viewAreaVisible = true
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/areas/${id}`)
      this.data.viewArea = job.data
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
      const payload = this.data.newArea
      payload['expiredDate'] = stringToDate(payload['expiredDate'])
      const areas: any = await doPOST(`v1/api/job-manger/areas`, this.data.newArea)
      if (areas.code === '00') {
        ElNotification({ message: 'Tạo mới công việc thành công', type: 'success' })
        this.data.newArea = {} as Job
        this.dialog.createAreaVisible = false
        await this.fetchJobs()
        return
      }
    },
    async editAttrArea() {
      const editAttrArea = this.data.editAttrArea
      const { id, title, summary, description, htmlContent, imageUrl, areaId, expiredDate } = editAttrArea
      const payload = {
        title,
        summary,
        description,
        htmlContent,
        imageUrl,
        areaId,
        expiredDate: stringToDate(editAttrArea.expiredDate),
      }

      const job: any = await doPUT(`v1/api/job-manger/areas/${id}`, payload)
      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa công việc thành công', type: 'success' })
        this.data.editAttrArea = {} as Job
        this.dialog.editAreaAttrVisible = false
        await this.fetchJobs()
        return
      }
    },
    async editStatusArea() {
      const { id, status } = this.data.editStatusArea
      const job: any = await doPATCH(`v1/api/job-manger/areas/${id}`, { status: status })
      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa trạng thái công việc thành công', type: 'success' })
        this.data.editAttrArea = {} as Job
        this.dialog.editAreaStatusVisible = false
        await this.fetchJobs()
        return
      }
    },
    async resetFilter() {
      this.filter.search = ''
      this.filter.date = ''
      this.filter.status = ''
      this.filter.area = ''
      await this.fetchJobs()
    },
  }
})