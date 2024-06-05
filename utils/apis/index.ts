export const doGET = async (url: string, params?: any, query?: any) => {
  const accessToken = useCookie("accessToken")
  const { data, error } = await useFetch(
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzYyNzc2MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.Ut0rBARJ--pWiMLkveocIa2ALxNS-quFzAswsfeJ7SY`,
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
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzYyNzc2MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.Ut0rBARJ--pWiMLkveocIa2ALxNS-quFzAswsfeJ7SY`,
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
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzYyNzc2MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.Ut0rBARJ--pWiMLkveocIa2ALxNS-quFzAswsfeJ7SY`,
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
    `http://18.141.39.162:8089/${url}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZWN1cmVkLWFwaSIsImF1ZCI6InNlY3VyZWQtYXBwIiwic3ViIjoidXNlcl9hZG1pbiIsImV4cCI6MTcxNzYyNzc2MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.Ut0rBARJ--pWiMLkveocIa2ALxNS-quFzAswsfeJ7SY`,
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
