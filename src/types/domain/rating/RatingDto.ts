export type RatingDto = {
  id: string
  imdbItemId: string | null
  userId: string
  value: number | null
  interestLevel: number | null
  createdAt: string
  updatedAt: string
}

export const buildDefaultRating = (p?: Partial<RatingDto>): RatingDto => ({
  id: "",
  imdbItemId: "",
  userId: "",
  value: null,
  interestLevel: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
