import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"

export interface ItemRecommendationDto {
  item: SyncroItemDto
  user: UserSimpleDto
  createdAt: string
}
