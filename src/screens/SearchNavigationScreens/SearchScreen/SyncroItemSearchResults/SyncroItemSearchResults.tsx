import { useFocusEffect } from "@react-navigation/native"
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
  onClickItemId: (imdbItemId: string) => void
  itemType: SyncroItemType
}

const SyncroItemSearchResults = ({ onClickItemId, query, itemType }: Props) => {
  const { data: searchResultItems, isLoading, refetch } = useOverallSearchQuery(
    query,
    itemType
  )

  useFocusEffect(() => {
    refetch()
  })

  const noResults = useMemo(
    () => !isLoading && searchResultItems?.length === 0,
    [isLoading, searchResultItems]
  )

  const notFoundMessage = useMemo(() => {
    if (itemType === "tvSeries") return "No TV series found :("
    if (itemType === "movie") return "No movies found :("
    return "No games found :("
  }, [itemType])

  const imdbItems = useMemo(() => {
    if (itemType !== "movie" && itemType !== "tvSeries") return []

    if (!searchResultItems) return []
    const items = [...searchResultItems] as IImdbResultItem[]
    return items
  }, [searchResultItems, itemType])

  const syncroItems = useMemo(() => {
    if (itemType !== "game") return []

    if (!searchResultItems) return []

    return [...searchResultItems] as SyncroItemDto[]
  }, [searchResultItems, itemType])

  return (
    <VStack mt={4} space={4}>
      {isLoading && <Spinner size="lg" color="primary.500" />}
      {noResults && <Text>{notFoundMessage}</Text>}

      {imdbItems?.map((imdbItem) => (
        <ImdbSearchItem
          resultItem={imdbItem}
          key={imdbItem.id}
          onClick={() => onClickItemId(imdbItem.id)}
        />
      ))}

      {syncroItems?.map((syncroItem) => (
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
