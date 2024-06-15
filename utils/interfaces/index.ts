export interface Job {
  createdAt?: string,
  updatedAt?: string,
  createdBy?: string,
  lastModifiedBy?: string,
  id?: number | null,
  title?: string,
  summary?: string,
  description?: string,
  htmlContent?: string,
  imageUrl?: string,
  areaId?: string | number,
  areaName?: string,
  expiredDate: string,
  status?: string,
}

export interface Area {
  code: string,
  name: string,
  status: string,
  id: string
}

export interface Sms {
  id: number,
  userId: number,
  senderName: string,
  senderPhone: string,
  content: string,
  userName: string,
  receivedDate: string,
  createdDate: string
}

export interface Resume {
  createdAt: string,
  updatedAt: string,
  createdBy: null | string,
  lastModifiedBy: null | string,
  id: number,
  userName: string,
  fullName: string,
  phoneNumber: string,
  dateOfBird: null | string,
  address: string,
  profileUrl: string,
  userId: number,
  status: string,
  photos: Array<any>
}

export interface JobConfirm {
  createdAt: string,
  updatedAt: string,
  createdBy: string,
  lastModifiedBy: string,
  id: number,
  resumeId: number,
  jobId: number,
  confirmUserId: number,
  rejectComment: string | null,
  status: string
}

export interface User {
  id: number,
  username: string,
  email: string,
  phone: null | number,
  description: null | number,
  status: string,
  authorities: any,
  createdAt: number,
  updatedAt: number
}

export type KeyResume = [
  { key: 'HEALTH_CERT', name: 'Giấy khám sức khỏe' },
  { key: 'ID_FRONT', name: 'Mặt trước căn cước' },
  { key: 'ID_BACK', name: 'Mặt sau căn cước' },
  { key: 'ID_PHOTO_CC', name: 'Căn cước photo công chứng' },
  { key: 'PASSPORT', name: 'Hộ chiếu' },
  { key: 'TPS2', name: 'Giấy Tư Pháp Số 2' },
  { key: 'OTHER', name: 'Giấy tờ khác' }
]
