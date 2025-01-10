import { doGET, doMethod, doUpload } from "~/utils/apis"
import type { Product } from "~/utils/interfaces"

export const useProductStore = defineStore('useProductStore', {
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
      list: [] as Product[],
      viewEntity: {} as Product,
      newEntity: {} as Product,
      editEntity: {} as Product,
      thumnail: '',
      images: [] as Array<String>
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
      const query: any = {
        limit: this.metadata.size,
        page: this.metadata.page,
      }
      if (this.filter.fulltext !== '') {
        query['s'] = JSON.stringify({
          name: { $cont: this.filter.fulltext }
        })
      }
      const entity: any = await doGET(`super-market/backend/product`, query)
      if (entity?.statusCode === 200) {
        this.data.list = entity?.data?.data
        this.metadata.totalElements = entity?.data?.total
        this.metadata.currentPage = entity.data.page
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async removeEntity(row: any) {
      const { id } = row
      await doMethod(`super-market/backend/product/${id}`, null, 'DELETE');
      await this.fetchEntity()
    },
    async createEntity() {
      const { name, price, categoryName, thumnail } = this.data.newEntity
      const entity: any = await doMethod(
        `super-market/backend/product`,
        { name, price, categoryName, thumnail, images: this.data.images.join(';') },
        'POST'
      )

      if (entity.statusCode === 200) {
        ElNotification({ message: 'Tạo mới thành công', type: 'success' })
        this.data.newEntity = {} as Product
        this.dialog.createEntityVisible = false
        this.data.images = []
        await this.fetchEntity()
        return
      }
    },
    async editEntity() {
      const { name, id, price, categoryName } = this.data.editEntity
      const entity: any = await doMethod(`super-market/backend/product/${id}`, {
        name, price, categoryName
      }, 'PATCH');
      if (entity.statusCode === 200) {
        this.data.editEntity = {} as Product
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
        this.data.newEntity.thumnail = fileUpload?.data
        return
      }
    },
    async uploadImages(file: any) {
      let data = new FormData()
      data.append('file', file.raw)
      const fileUpload = await doUpload('v1/api/job-manger/document/uploads', data)

      if (fileUpload.code === '00') {
        ElMessage({ message: 'Upload hình ảnh thành công', type: 'success', plain: true })
        this.data?.images.push(fileUpload.data)
        return
      }
    },
    async openDialogView(row: any) {
      this.dialog.viewEntityVisible = true
      this.loading.view = true
      const { id } = row
      const entity: any = await doGET(`super-market/backend/product/${id}`)

      if (entity?.statusCode === 200) {
        this.data.viewEntity = entity.data
        this.loading.view = false
        return
      }
    },
    async openDialogEdit(row: any) {
      this.dialog.editEntityVisible = true
      this.loading.view = true
      const { id } = row
      const entity: any = await doGET(`super-market/backend/product/${id}`)

      if (entity?.statusCode === 200) {
        this.data.editEntity = entity.data
        this.loading.view = false
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