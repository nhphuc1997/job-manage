export default defineNuxtRouteMiddleware(() => {
  const accessTokenCookie = useCookie("accessToken")
  const router = useRouter()

  if (accessTokenCookie.value) {
    router.back()
  }

  router.push('/')
})