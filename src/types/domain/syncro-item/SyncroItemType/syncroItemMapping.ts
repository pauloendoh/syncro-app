import { SyncroItemType } from "./SyncroItemType"

export const syncroItemMapping: {
  [key in SyncroItemType]: {
    labelPlural: string
    site: string
  }
} = {
  "tv series": {
    labelPlural: "TV Series",
    site: "IMDB",
  },
  movie: {
    labelPlural: "Movies",
    site: "IMDB",
  },
  game: {
    labelPlural: "Games",
    site: "IGDB",
  },
}
