import { RationItemType } from "./domain/RationItemType"

export type ProfileScreenTypes = {
  Profile: { userId: string }
  UserRatings: {
    userId: string
    itemType: RationItemType
  }
}
