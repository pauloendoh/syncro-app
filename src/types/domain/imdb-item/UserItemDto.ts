import { ImdbItemDto } from "./ImdbItemDto"

export type UserItemDto = ImdbItemDto & {
  myRating: number | null
  myInterest: number | null
}
