import { RationItemType } from "./domain/RationItemType"

export type ProfileScreenTypes = {
  Profile: undefined
  UserRatings: {
    userId: string
    itemType: RationItemType
  }
}
