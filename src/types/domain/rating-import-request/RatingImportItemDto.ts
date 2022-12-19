import { SyncroItemDto } from "../syncro-item/SyncroItemDto"

export interface RatingImportItemDto {
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  requestId: string
  status: string
  syncroItemId?: string
  ratingValue: number
  originalTitle: string
  originalLink: string
  errorQty: number

  syncroItem?: SyncroItemDto
}
