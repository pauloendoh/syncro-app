import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"

export interface NotificationDto {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  showDot: boolean
  followId?: string
  follow?: Follow
}

interface Follow {
  id: string
  followerId: string
  followingUserId: string
  createdAt: string
  updatedAt: string
  follower: UserSimpleDto
}
