export const doGET = async (url: string, params?: any, query?: any) => {
  const accessToken = useCookie("accessToken")
  const { data } = await useFetch(
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

  const result: any = data.value
  if (result.code === '05') return navigateTo('/login')
  return result
}

export const doPOST = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: 'POST',
      body: payload,
    }
  )

  const result: any = data.value
  if (result.code === '05') return navigateTo('/login')
  return result
}

export const doPUT = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: 'PUT',
      body: payload,
    }
  )

  const result: any = data.value
  if (result.code === '05') return navigateTo('/login')
  return result
}

export const doPATCH = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken.value}`,
      },
      method: 'PATCH',
      body: payload,
    }
  )

  const result: any = data.value
  if (result.code === '05') return navigateTo('/login')
  return result
}
