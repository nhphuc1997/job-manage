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
