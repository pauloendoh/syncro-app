import { ProfileScreenTypes } from "./ProfileScreenTypes"

export type HomeScreenTypes = ProfileScreenTypes & {
  Home: undefined
  Notifications: undefined
  SyncroItem: {
    itemId: string
  }
  MyNextItems: undefined
}
