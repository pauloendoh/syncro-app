import { ProfileScreenTypes } from "./ProfileScreenTypes"

export type SearchScreenTypes = ProfileScreenTypes & {
  Search: undefined
  SyncroItem: {
    itemId: string
  }
}
