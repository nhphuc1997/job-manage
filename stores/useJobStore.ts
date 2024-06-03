import type { Job } from "~/utils/interfaces"
import { doGET } from "~/utils/apis"

export const useJobStore = defineStore('useJobStore', {
  state: () => ({
    jobs: [] as Job[],
    page: 0,
    size: 10,
    totalElements: 0,
    currentPage: 0,
    optionsStatus: [
      {
        value: 'ACTIVE',
        label: 'active',
      }
    ],
    searchTearm: '',
    status: ''
  }),
  actions: {
    async fetchJobs() {
      const query: any = {
        page: this.page - 1,
        size: this.size,
      }
      // if (this.searchTearm !== '') {
      //   query['filter'] = `title~*${this.searchTearm}*`
      // }
      // if (this.status !== '') {
      //   query['status'] = `status~*${this.status}*`
      // }
      const jobs: any = await doGET(`http://18.141.39.162:8089/v1/api/job-manger/jobs`, query)
      this.jobs = jobs?.data?.content
      this.size = jobs?.data?.size
      this.page = jobs?.data?.number
      this.totalElements = jobs?.data?.totalElements
      this.currentPage = this.page + 1
    },
  }
})