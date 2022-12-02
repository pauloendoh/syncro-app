import { InterestDto } from "../interest/InterestDto"
import { RatingDto } from "../rating/RatingDto"

export interface SyncroItemDto {
  id: string
  title: string
  type: "tvSeries" | "movie"
  imageUrl: string
  year: number
  avgRating: number
  ratingCount: number
  plotSummary: string

  ratings?: RatingDto[]
  interests?: InterestDto[]
}

export const buildSyncroItemDto = (
  p?: Partial<SyncroItemDto>
): SyncroItemDto => ({
  id: "",
  title: "",
  type: "tvSeries",
  imageUrl: "",
  year: 0,
  avgRating: 0,
  ratingCount: 0,
  plotSummary: "",
  ...p,
})
