export const doGET = async (url: string, params?: any, query?: any) => {
  const accessToken = useCookie("accessToken")

  if (accessToken.value === null || accessToken.value === undefined) {
    return navigateTo('/')
  }

  const { data, status } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: 'GET',
      params: params,
      query: query
    }
  )

  if (status.value === 'error') {
    ElNotification({ message: "Network error", type: 'error', duration: 0 })
    return
  }

  const result: any = data.value
  if (result.code === '05') return navigateTo('/')
  return result
}

export const doMethod = async (url: string, payload: any, method: 'POST' | 'PUT' | 'PATCH') => {
  const accessToken = useCookie("accessToken")
  const { data, status } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: method,
      body: payload,
    }
  )

  if (status.value === 'error') {
    ElNotification({ message: "Network error", type: 'error', duration: 0 })
    return
  }

  const result: any = data.value
  if (result.code === '05') return navigateTo('/')
  return result
}

export const doUpload = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data, status } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: 'POST',
      body: payload,
    }
  )

  if (status.value === 'error') {
    ElNotification({ message: "Network error", type: 'error', duration: 0 })
    return
  }

  const result: any = data.value
  if (result.code === '05') return navigateTo('/')
  return result
}
