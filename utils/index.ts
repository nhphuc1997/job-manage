import { dayjs } from "element-plus"

export const stringToDate = (str: string) => {
  return dayjs(str).format('DD/MM/YYYY hh:mm:ss').toString()
}

export const redirectTo = (path: string) => {
  return navigateTo({ path }, { open: { target: '_blank' } })
}

export const timeStampToDate = (timestamp: number) => {
  return dayjs(timestamp).format('DD/MM/YYYY hh:mm:ss').toString()
}

export const dateFromString = (str: string) => {
  return dayjs(str, 'DD/MM/YYYY HH:mm:ss').toDate().toISOString()
}

export const TTL_COOKIE = 6000
export const LOADING_TIMEOUT = 500
