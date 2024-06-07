import { doGET } from "~/utils/apis"
import { stringToDate } from "~/utils"
import type { User } from "~/utils/interfaces"

export const useUserStore = defineStore('useUserStore', {
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
      users: [] as User[],
      viewUser: {} as User,
      optionsForFilterRole: [
        { label: 'Người quản trị', value: 'ROLE_ADMIN' },
        { label: 'Người dùng', value: 'ROLE_USER' },
      ],
      optionsForFilterStatus: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Inactive', value: 'INACTIVE' },
      ]
    },
    dialog: {
      viewUserVisible: false,
    }
  }),
  actions: {
    async fetchUsers() {
      const query: any = {
        page: this.metadata.page >= 1 ? this.metadata.page - 1 : 0,
        size: this.metadata.size ?? 10,
        sort: 'id,desc'
      }
      if (this.filter.fulltext !== '') {
        const fulltext = this.filter.fulltext
        query['filter'] = `username~'*${fulltext}*' or email~'*${fulltext}*' or phone~'*${fulltext}*' or description~'*${fulltext}*'`
      }
      if (this.filter.status !== '') {
        query['filter'] = `status~'${this.filter.status}'`
      }
      if (this.filter.createdAt !== '') {
        const fromDate = stringToDate(this.filter.createdAt[0])
        const toDate = stringToDate(this.filter.createdAt[1])
        query['filter'] = `createdAt>:'${fromDate}' and createdAt<:'${toDate}'`
      }

      const users: any = await doGET(`v1/api/job-manger/managements/users`, query)
      if (users.code === '00') {
        this.data.users = users?.data?.content
        this.metadata.size = users?.data?.size
        this.metadata.page = users?.data?.number
        this.metadata.totalElements = users?.data?.totalElements
        this.metadata.currentPage = this.metadata.page + 1
        return
      }

      ElNotification({ message: 'Hệ thống tạm thời gián đoạn, vui lòng thử lại sau' })
      return
    },
    async openDialogView(row: any) {
      this.dialog.viewUserVisible = true
      const { id } = row
      const job: any = await doGET(`v1/api/job-manger/managements/users/${id}`)
      job.data['authorities'] = job.data['authorities'].map((item: Record<string, any>) => item.code)
      this.data.viewUser = job.data
    },
    async paginationSizeChange(size: number) {
      this.metadata.size = size
      await this.fetchUsers()
    },
    async paginationPageChange(page: number) {
      this.metadata.page = page
      this.metadata.currentPage - 1
      await this.fetchUsers()
    },
    async resetFilter() {
      this.filter.fulltext = ''
      this.filter.status = ''
      this.filter.role = ''
      this.filter.createdAt = ''
      await this.fetchUsers()
    },
  }
})