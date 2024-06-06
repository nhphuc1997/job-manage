import { doPOST } from "~/utils/apis"

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    data: {
      login: {
        username: '',
        password: ''
      },
      currentUser: {
        name: '',
        role: ''
      }
    }
  }),
  actions: {
    async doLogin() {
      const { username, password } = this.data.login
      const authInfor: any = await doPOST(`v1/api/job-manger/users/authenticate`, { username, password })

      if (authInfor.code === '00') {
        const accessTokenCookie = useCookie('accessToken', { maxAge: TTL_COOKIE })
        const refreshTokenCookie = useCookie('refreshToken', { maxAge: TTL_COOKIE })

        accessTokenCookie.value = String(authInfor?.data?.accessToken?.value)
        refreshTokenCookie.value = String(authInfor?.data?.refreshToken?.value)

        this.data.currentUser = {
          name: authInfor.data.userName,
          role: authInfor.data.authorities
        }
      }
    }
  }
})