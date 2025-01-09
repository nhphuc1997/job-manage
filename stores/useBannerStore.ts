import type { UploadFile, UploadUserFile } from "element-plus"
import { doGET, doMethod, doUpload } from "~/utils/apis"
import type { Banner } from "~/utils/interfaces"

export const useBannerStore = defineStore('useBannerStore', {
  state: () => ({
    metadata: {
      page: 1,
      size: 10,
      totalElements: 0,
      currentPage: 0,
    },
    filter: {
      fulltext: '',
    },
    data: {
      list: [] as Banner[],
      viewEntity: {} as Banner,
      newEntity: {} as Banner,
      editEntity: {} as Banner,
      thumbnail: {} as UploadFile,
      images: [{}] as UploadUserFile[]
    },
    dialog: {
      viewEntityVisible: false,
      createEntityVisible: false,
      editEntityVisible: false,
    },
    loading: {
      view: false
    }
  }),
  actions: {
    async fetchEntity() {
      const entity: any = await doGET(`super-market/backend/banner`)
      if (entity?.statusCode === 200) {
        this.data.list = entity?.data
        this.metadata.totalElements = entity?.data?.total
        this.metadata.currentPage = entity.data.page
        return
      }
      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async removeEntity(row: any) {
      const { id } = row
      await doMethod(`super-market/backend/banner/${id}`, null, 'DELETE');
      await this.fetchEntity()
    },
    async createEntity() {
      const { url } = this.data.newEntity
      const entity: any = await doMethod(`super-market/backend/banner`, { url }, 'POST')
      if (entity.statusCode === 200) {
        ElNotification({ message: 'Tạo mới thành công', type: 'success' })
        this.data.newEntity = {} as Banner
        this.dialog.createEntityVisible = false
        await this.fetchEntity()
        return
      }
    },
    async editEntity() {
      const { url, id } = this.data.editEntity
      const entity: any = await doMethod(`super-market/backend/banner/${id}`, { url }, 'PATCH');
      if (entity.statusCode === 200) {
        this.data.editEntity = {} as Banner
        this.dialog.editEntityVisible = false
        await this.fetchEntity()
        return
      }
    },
    async uploadFileThumbnail(file: any) {
      let data = new FormData()
      data.append('file', file.raw)
      const fileUpload = await doUpload('v1/api/job-manger/document/uploads', data);
      if (fileUpload.code === '00') {
        const entity: any = await doMethod(`super-market/backend/banner`, { url: fileUpload.data }, 'POST')
        if (entity.statusCode === 200) {
          ElNotification({ message: 'Tạo mới thành công', type: 'success' })
          this.data.newEntity = {} as Banner
          this.dialog.createEntityVisible = false
          await this.fetchEntity()
          return
        }
        return
      }
    }, 
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchEntity()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchEntity()
    }
  }
})