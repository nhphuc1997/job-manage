import { doGET } from "~/utils/apis"
import type { Category } from "~/utils/interfaces"

export const useCategoryStore = defineStore('useCategoryStore', {
  state: () => ({
    metadata: {
      page: 0,
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
    loading: {
      view: false
    }
  }),
  actions: {
    async fetchCategory() {
      const categories: any = await doGET(`super-market/backend/category`)
      if (categories?.statusCode === 200) {
        this.data.categories = categories?.data?.data
        this.metadata.totalElements = categories?.data?.total
        this.metadata.currentPage = categories.data.page
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
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