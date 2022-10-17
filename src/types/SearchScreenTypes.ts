import { ProfileScreenTypes } from "./ProfileScreenTypes"

export type SearchScreenTypes = ProfileScreenTypes & {
  Search: undefined
  ImdbItem: {
    imdbId: string
  }
}
