import { SyncroItemDto } from "../syncro-item/SyncroItemDto"

export type RatingDto = {
  id: string
  syncroItemId: string | null
  userId: string
  ratingValue: number | null
  createdAt: string
  updatedAt: string

  syncroItem?: SyncroItemDto
  user?: {
    username: string
  }
}

export const buildRatingDto = (p?: Partial<RatingDto>): RatingDto => ({
  id: "",
  syncroItemId: "",
  userId: "",
  ratingValue: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
