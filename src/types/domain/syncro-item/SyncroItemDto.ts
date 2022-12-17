import { InterestDto } from "../interest/InterestDto"
import { RatingDto } from "../rating/RatingDto"
import { SyncroItemType } from "./SyncroItemType/SyncroItemType"

export interface SyncroItemDto {
  id: string
  title: string
  type: SyncroItemType
  imageUrl: string
  year: number
  avgRating: number
  ratingCount: number
  plotSummary: string

  igdbUrl: string | null
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

  igdbUrl: null,
  avgRating: 0,
  ratingCount: 0,
  plotSummary: "",
  ...p,
})
