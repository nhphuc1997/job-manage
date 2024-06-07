import { doMethod } from "~/utils/apis"

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
      const authInfor: any = await doMethod(`v1/api/job-manger/users/authenticate`, { username, password }, 'POST')

      if (authInfor.code === '00') {
        const accessTokenCookie = useCookie('accessToken', { maxAge: TTL_COOKIE })
        const userName = useCookie('userName', { maxAge: TTL_COOKIE })
        const refreshTokenCookie = useCookie('refreshToken', { maxAge: TTL_COOKIE })

        accessTokenCookie.value = String(authInfor?.data?.accessToken?.value)
        refreshTokenCookie.value = String(authInfor?.data?.refreshToken?.value)
        userName.value = String(authInfor?.data?.userName)

        this.data.currentUser = {
          name: authInfor.data.userName,
          role: authInfor.data.authorities
        }

        this.data.login = {
          username: '',
          password: ''
        }
        ElNotification({ message: 'Đăng nhập thành công', type: 'success' })
        return navigateTo('/areas')
      }
    },
    doLogout() {
      const accessToken = useCookie("accessToken")
      accessToken.value = undefined
      ElNotification({ message: 'Đăng xuất thành công', type: 'success' })
      return navigateTo('/login')
    }
  }
})