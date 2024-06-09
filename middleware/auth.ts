export default defineNuxtRouteMiddleware(() => {
  const accessTokenCookie = useCookie("accessToken")
  if (accessTokenCookie.value !== null || accessTokenCookie.value !== undefined) { return }
  return navigateTo('/')
})