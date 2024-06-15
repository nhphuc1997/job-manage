import { dayjs } from "element-plus"
import type { KeyResume } from "./interfaces"

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

export const KEYS_RESUME: KeyResume = [
  { key: 'HEALTH_CERT', name: 'Chứng chỉ sức khỏe' },
  { key: 'ID_FRONT', name: 'Mặt trước căn cước' },
  { key: 'ID_BACK', name: 'Mặt sau căn cước' },
  { key: 'ID_PHOTO_CC', name: 'Căn cước' },
  { key: 'PASSPORT', name: 'Hộ chiếu' },
  { key: 'TPS2', name: 'TPS2' },
  { key: 'OTHER', name: 'Chứng chỉ khác' },
]
