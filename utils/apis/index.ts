export const doGET = async (url: string, params?: any, query?: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    url,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzU4OTM1NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.pcckZ_wpX3PK4H2Xz1N4-slQp_MYCI4pb-5dY2tnIPg`,
      },
      method: 'GET',
      params: params,
      query: query
    }
  )


  if (error.value?.message) {
    return ElNotification(error.value?.message)
  }

  return data?.value
}


export const doPOST = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    url,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzU4OTM1NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.pcckZ_wpX3PK4H2Xz1N4-slQp_MYCI4pb-5dY2tnIPg`,
      },
      method: 'POST',
      body: payload,
    }
  )

  if (error.value?.message) {
    return ElNotification(error.value?.message)
  }

  return data?.value
}

export const doPUT = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    url,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzU4OTM1NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.pcckZ_wpX3PK4H2Xz1N4-slQp_MYCI4pb-5dY2tnIPg`,
      },
      method: 'PUT',
      body: payload,
    }
  )

  if (error.value?.message) {
    return ElNotification(error.value?.message)
  }

  return data?.value
}

export const doPATCH = async (url: string, payload: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    url,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzU4OTM1NywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.pcckZ_wpX3PK4H2Xz1N4-slQp_MYCI4pb-5dY2tnIPg`,
      },
      method: 'PATCH',
      body: payload,
    }
  )

  if (error.value?.message) {
    return ElNotification(error.value?.message)
  }

  return data?.value
}
