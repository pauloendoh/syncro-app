import { ProfileScreenTypes } from "./ProfileScreenTypes"

export type HomeScreenTypes = ProfileScreenTypes & {
  Home: undefined
  Notifications: undefined
  ImdbItem: {
    imdbId: string
  }
}
