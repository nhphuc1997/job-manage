import type { Area } from "~/utils/interfaces"
import { doGET, doMethod } from "~/utils/apis"

export const useAreaStore = defineStore('useAreaStore', {
  state: () => ({
    metadata: {
      page: 0,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      fulltext: '',
      date: '',
      status: '',
    },
    data: {
      areas: [] as Area[],
      viewArea: {} as Area,
      newArea: {} as Area,
      editAttrArea: {} as Area,
      editStatusArea: { id: '', status: '' },
      listStatus: [
        { value: 'ACTIVE', label: 'Đang hoạt động' },
        { value: 'INACTIVE', label: 'Không hoạt động' },
      ],
      zones: [] as Area[]
    },
    dialog: {
      createAreaVisible: false,
      editAreaAttrVisible: false,
      editAreaStatusVisible: false,
      viewAreaVisible: false,
    }
  }),
  actions: {
    async fetchAreas() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
        sort: 'id,desc'
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] = `name~'*${fulltext}*' or code~'${fulltext}'`
      }
      if (this.filter.status !== '') query['filter'] = `status~'${this.filter.status}'`

      const areas: any = await doGET(`v1/api/job-manger/areas`, query)
      if (areas?.code === '00') {
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
    async fetchAllZones() {
      const zones: any = await doGET(`v1/api/job-manger/areas`)
      this.data.zones = zones?.data?.content
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
      await this.fetchAreas()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchAreas()
    },
    async createJob() {
      const { name, code } = this.data.newArea
      const areas: any = await doMethod(`v1/api/job-manger/areas`, { name, code }, 'POST')

      if (areas.code === '00') {
        ElNotification({ message: 'Tạo mới khu vực thành công', type: 'success' })
        this.data.newArea = {} as Area
        this.dialog.createAreaVisible = false
        await this.fetchAreas()
        return
      }
    },
    async editAttrArea() {
      const { id, name, code } = this.data.editAttrArea
      const job: any = await doMethod(`v1/api/job-manger/areas/${id}`, { name, code }, 'PUT')

      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa khu vực thành công', type: 'success' })
        this.data.editAttrArea = {} as Area
        this.dialog.editAreaAttrVisible = false
        await this.fetchAreas()
        return
      }
    },
    async editStatusArea() {
      const { id, status } = this.data.editStatusArea
      const job: any = await doMethod(`v1/api/job-manger/areas/${id}`, { status: status }, 'PATCH')

      if (job.code === '00') {
        ElNotification({ message: 'Chỉnh sửa trạng thái khu vực thành công', type: 'success' })
        this.data.editAttrArea = {} as Area
        this.dialog.editAreaStatusVisible = false
        await this.fetchAreas()
        return
      }
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.date = ''
      this.filter.status = ''
      await this.fetchAreas()
    },
  }
})