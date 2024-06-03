export const doGET = async (url: string, params?: any, query?: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    url,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzQzMzY5NCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.G4lgyYf8YGKyORsZEJTbi4L90XfWrun7sQcypO2WMi4`,
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

  if (error.value?.message) {
    return ElNotification(error.value?.message)
  }

  return data?.value
}
