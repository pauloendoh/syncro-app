import { RationItemType } from "./domain/RationItemType"

export type ProfileScreenTypes = {
  Profile: { userId: string }
  FollowersScreen: { userId: string; type: "followers" | "following-users" }
  UserItems: {
    userId: string
    itemType: RationItemType
  }
  ImdbItem: {
    imdbId: string
  }
}
