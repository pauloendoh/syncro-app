import { ImdbItemDto } from "../../../../types/domain/imdb-item/ImdbItemDto"
import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"

export interface ItemRecommendationDto {
  item: ImdbItemDto
  user: UserSimpleDto
  createdAt: string
}
