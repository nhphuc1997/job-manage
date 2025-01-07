import { doGET, doMethod } from "~/utils/apis"
import type { Category } from "~/utils/interfaces"

export const useCategoryStore = defineStore('useCategoryStore', {
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
      categories: [] as Category[],
      viewCategory: {} as Category,
      newCategory: {} as Category,
    },
    dialog: {
      viewCategoryVisible: false,
      createCategoryVisible: false,
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
      const entity: any = await doGET(`super-market/backend/category`, query)
      if (entity?.statusCode === 200) {
        this.data.categories = entity?.data?.data
        this.metadata.totalElements = entity?.data?.total
        this.metadata.currentPage = entity.data.page
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async removeEntity(row: any) {
      const { id } = row
      await doMethod(`super-market/backend/category/${id}`, null, 'DELETE');
      await this.fetchEntity()
    },
    async createEntity() {
      const { name } = this.data.newCategory
      const entity: any = await doMethod(`super-market/backend/category`, { name }, 'POST')

      if (entity.statusCode === 200) {
        ElNotification({ message: 'Tạo mới danh mục thành công', type: 'success' })
        this.data.newCategory = {} as Category
        this.dialog.createCategoryVisible = false
        await this.fetchEntity()
        return
      }
    },
    async openDialogView(row: any) {
      this.dialog.viewCategoryVisible = true
      this.loading.view = true
      const { id } = row
      const entity: any = await doGET(`super-market/backend/category/${id}`)

      if (entity?.statusCode === 200) {
        this.data.viewCategory = entity.data
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