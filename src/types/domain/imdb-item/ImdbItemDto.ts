import { InterestDto } from "../interest/InterestDto"
import { RatingDto } from "../rating/RatingDto"

export interface ImdbItemDto {
  id: string
  title: string
  type: string
  imageUrl: string
  year: number
  avgRating: number
  ratingCount: number
  plotSummary: string

  ratings?: RatingDto[]
  interests?: InterestDto[]
}

export const buildImdbItemDto = (p?: Partial<ImdbItemDto>): ImdbItemDto => ({
  id: "",
  title: "",
  type: "",
  imageUrl: "",
  year: 0,
  avgRating: 0,
  ratingCount: 0,
  plotSummary: "",
  ...p,
})
