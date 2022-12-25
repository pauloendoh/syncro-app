import { useMemo } from "react"
import { SyncroItemType } from "./SyncroItemType"

export const useSyncroItemTypeMap = (by: {
  tabIndex?: number
  itemType?: SyncroItemType
}) => {
  const options: {
    itemType: SyncroItemType
    labelPlural: string
    site: string
    tabIndex: number
    getLabel: (isPlural: boolean) => string
  }[] = [
    {
      itemType: "tvSeries",
      labelPlural: "TV Series",

      site: "IMDB",
      tabIndex: 0,
      getLabel: (isPlural: boolean) => (isPlural ? "TV Series" : "TV Series"),
    },
    {
      itemType: "movie",
      labelPlural: "Movies",
      site: "IMDB",
      tabIndex: 1,
      getLabel: (isPlural: boolean) => (isPlural ? "Movies" : "Movie"),
    },
    {
      itemType: "game",
      labelPlural: "Games",
      site: "IGDB",
      tabIndex: 2,
      getLabel: (isPlural: boolean) => (isPlural ? "Games" : "Game"),
    },
    {
      itemType: "manga",
      labelPlural: "Manga",
      site: "MyAnimeList",
      tabIndex: 3,
      getLabel: (isPlural: boolean) => (isPlural ? "Manga" : "Manga"),
    },
  ]

  const item = useMemo(() => {
    let result = options
    if (by.itemType) result = result.filter((r) => r.itemType === by.itemType)
    if (by.tabIndex) result = result.filter((r) => r.tabIndex === by.tabIndex)

    return result[0]
  }, [options, by])

  return item
}
