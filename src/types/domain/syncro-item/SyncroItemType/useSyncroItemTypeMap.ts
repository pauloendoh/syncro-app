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
  }[] = [
    {
      itemType: "tvSeries",
      labelPlural: "TV Series",
      site: "IMDB",
      tabIndex: 0,
    },
    {
      itemType: "movie",
      labelPlural: "Movies",
      site: "IMDB",
      tabIndex: 1,
    },
    {
      itemType: "game",
      labelPlural: "Games",
      site: "IGDB",
      tabIndex: 2,
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
