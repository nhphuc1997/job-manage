import { doGET } from "~/utils/apis"
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
      status: '',
      role: '',
      createdAt: ''
    },
    data: {
      categories: [] as Category[],
      viewCategory: {} as Category,
    },
    dialog: {
      viewCategoryVisible: false,
    },
    loading: {
      view: false
    }
  }),
  actions: {
    async fetchCategory() {
      const query = {
        limit: this.metadata.size,
        page: this.metadata.page,
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
      await this.fetchCategory()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchCategory()
    },
    async resetFilter() {
      this.filter.fulltext = ''
      await this.fetchCategory()
    },
  }
})