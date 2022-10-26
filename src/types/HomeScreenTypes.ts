import { ProfileScreenTypes } from "./ProfileScreenTypes"

export type HomeScreenTypes = ProfileScreenTypes & {
  Home: undefined
  ImdbItem: {
    imdbId: string
  }
}
