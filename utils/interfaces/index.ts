export interface Job {
  createdAt?: string,
  updatedAt?: string,
  createdBy?: string,
  lastModifiedBy?: string,
  id?: number,
  title?: string,
  summary?: string,
  description?: string,
  htmlContent?: string,
  imageUrl?: string,
  areaId?: string | number,
  expiredDate: string,
  status?: string,
}
