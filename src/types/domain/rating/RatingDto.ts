import { ImdbItemDto } from "../imdb-item/ImdbItemDto"

export type RatingDto = {
  id: string
  imdbItemId: string | null
  userId: string
  ratingValue: number | null
  createdAt: string
  updatedAt: string

  imdbItem?: ImdbItemDto
  user?: {
    username: string
  }
}

export const buildRatingDto = (p?: Partial<RatingDto>): RatingDto => ({
  id: "",
  imdbItemId: "",
  userId: "",
  ratingValue: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})