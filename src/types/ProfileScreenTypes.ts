import { ProfileDto } from "./domain/profile/ProfileDto"
import { SyncroItemType } from "./domain/syncro-item/SyncroItemType/SyncroItemType"

export type ProfileScreenTypes = {
  Profile: { userId: string }
  EditProfile: { initialValues: ProfileDto }
  FollowersScreen: { userId: string; type: "followers" | "following-users" }
  UserItems: {
    userId: string
    itemType: SyncroItemType
  }
  SyncroItem: {
    itemId: string
  }
}
