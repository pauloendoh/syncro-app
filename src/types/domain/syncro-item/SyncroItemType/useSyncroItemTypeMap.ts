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
    getLabel: (isPlural?: boolean) => string
  }[] = [
    {
      itemType: "tvSeries",
      labelPlural: "TV Series",

      site: "IMDb",
      tabIndex: 0,
      getLabel: (isPlural = false) => (isPlural ? "TV Series" : "TV Series"),
    },
    {
      itemType: "movie",
      labelPlural: "Movies",
      site: "IMDb",
      tabIndex: 1,
      getLabel: (isPlural = false) => (isPlural ? "Movies" : "Movie"),
    },
    {
      itemType: "game",
      labelPlural: "Games",
      site: "IGDb",
      tabIndex: 2,
      getLabel: (isPlural = false) => (isPlural ? "Games" : "Game"),
    },
    {
      itemType: "manga",
      labelPlural: "Manga",
      site: "MAL",
      tabIndex: 3,
      getLabel: (isPlural = false) => (isPlural ? "Manga" : "Manga"),
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
