import { doGET } from "~/utils/apis"
import type { Order } from "~/utils/interfaces"

export const useOrderStore = defineStore('useOrderStore', {
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
      list: [] as Order[],
      viewEntity: {} as Order,
      newEntity: {} as Order,
      editEntity: {} as Order,
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
      const entity: any = await doGET(`super-market/backend/order`, query)
      if (entity?.statusCode === 200) {
        this.data.list = entity?.data?.data
        this.metadata.totalElements = entity?.data?.total
        this.metadata.currentPage = entity.data.page
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async openDialogView(row: any) {
      this.dialog.viewEntityVisible = true
      this.loading.view = true
      const { id } = row
      const entity: any = await doGET(`super-market/backend/order/${id}`)

      if (entity?.statusCode === 200) {
        this.data.viewEntity = entity.data
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