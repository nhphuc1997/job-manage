import { dayjs } from "element-plus"

export const stringToDate = (str: string) => {
  return dayjs(str).format('DD/MM/YYYY hh:mm:ss').toString()
}

export const TTL_COOKIE = 6000
export const LOADING_TIMEOUT = 500
