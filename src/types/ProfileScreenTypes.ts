import { RationItemType } from "./domain/RationItemType"

export type ProfileScreenTypes = {
  Profile: { userId: string }
  UserItems: {
    userId: string
    itemType: RationItemType
  }
  ImdbItem: {
    imdbId: string
  }
}
