export default defineNuxtRouteMiddleware(() => {
  const accessTokenCookie = useCookie("accessToken")
  if (accessTokenCookie) { return }
  return navigateTo('/login')
})