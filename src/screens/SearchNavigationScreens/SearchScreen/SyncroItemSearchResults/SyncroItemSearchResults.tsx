import { Spinner, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { useOverallSearchQuery } from "../../../../hooks/react-query/search/useOverallSearchQuery"
import { IImdbResultItem } from "../../../../types/domain/movie/MovieResultResponseDto"
import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import ImdbSearchItem from "./ImdbSearchItem/ImdbSearchItem"
import SyncroSearchItem from "./SyncroSearchItem/SyncroSearchItem"

interface Props {
  query: string
  onClickItemId: (itemId: string) => void
  itemType: SyncroItemType
}

const SyncroItemSearchResults = ({ onClickItemId, query, itemType }: Props) => {
  const { data: searchResultItems, isLoading } = useOverallSearchQuery(
    query,
    itemType
  )

  const noResults = useMemo(
    () => !isLoading && searchResultItems?.length === 0,
    [isLoading, searchResultItems]
  )

  const notFoundMessage = useMemo(() => {
    if (itemType === "tvSeries") return "No TV series found :("
    if (itemType === "movie") return "No movies found :("
    return "No games found :("
  }, [itemType])

  // PE 1/3 - remove imdbItems?
  const imdbItems = useMemo(() => {
    if (itemType !== "movie" && itemType !== "tvSeries") return []

    if (!searchResultItems) return []
    const items = [...searchResultItems] as IImdbResultItem[]
    return items
  }, [searchResultItems, itemType])

  const otherSyncroItems = useMemo(() => {
    if (itemType !== "game" && itemType !== "manga") return []

    if (!searchResultItems) return []

    return [...searchResultItems] as SyncroItemDto[]
  }, [searchResultItems, itemType])

  return (
    <VStack mt={4} space={4}>
      {isLoading && <Spinner size="lg" color="primary.500" />}
      {noResults && <Text>{notFoundMessage}</Text>}

      {/* <Text>{JSON.stringify(error)}</Text> */}

      {imdbItems?.map((imdbItem) => (
        <ImdbSearchItem
          resultItem={imdbItem}
          key={imdbItem.id}
          onClick={() => onClickItemId(imdbItem.id)}
        />
      ))}

      {otherSyncroItems?.map((syncroItem) => (
        <SyncroSearchItem
          syncroItem={syncroItem}
          key={syncroItem.id}
          onClick={() => onClickItemId(syncroItem.id)}
        />
      ))}
    </VStack>
  )
}

export default SyncroItemSearchResults
