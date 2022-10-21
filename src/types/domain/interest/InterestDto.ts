import { ImdbItemDto } from "../imdb-item/ImdbItemDto"

export type InterestDto = {
  id: string
  imdbItemId: string | null
  userId: string
  interestLevel: number | null
  createdAt: string
  updatedAt: string

  imdbItem?: ImdbItemDto
  user?: {
    username: string
  }
}

export const buildInterestDto = (p?: Partial<InterestDto>): InterestDto => ({
  id: "",
  imdbItemId: "",
  userId: "",
  interestLevel: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
