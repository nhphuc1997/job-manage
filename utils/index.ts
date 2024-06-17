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
  { key: 'HEALTH_CERT', name: 'Giấy khám sức khỏe' },
  { key: 'ID_FRONT', name: 'Mặt trước căn cước' },
  { key: 'ID_BACK', name: 'Mặt sau căn cước' },
  { key: 'ID_PHOTO_CC', name: 'Căn cước photo công chứng' },
  { key: 'PASSPORT', name: 'Hộ chiếu' },
  { key: 'TPS2', name: 'Giấy Tư Pháp Số 2' },
  { key: 'OTHER', name: 'Giấy tờ khác' },
]

export const parseElTagResumeStatus = (type: string): any => {
  if (type) {
    return {
      FULL_INFO: 'success',
      NEED_ADDITIONAL_INFO: 'warning',
      NEED_MANDATORY_INFO: 'danger'
    }[type]
  }
  return 'info'
}

export const parseResumeStatus = (type: string): any => {
  return {
    FULL_INFO: 'Đủ thông tin',
    NEED_ADDITIONAL_INFO: 'Thiếu thông tin bổ sung',
    NEED_MANDATORY_INFO: 'Thiếu thông tin bắt buộc'
  }[type]
}

export const parseStatusV1 = (type: string) => {
  return {
    ACTIVE: 'Đang hoạt động',
    INACTIVE: 'Không hoạt động',
  }[type]
}

export const parseStatusV2 = (type: string) => {
  return {
    REJECT: 'Từ chối',
    APPROVED: 'Đồng ý',
    PENDING: 'Chờ chấp thuận',
  }[type]
}
