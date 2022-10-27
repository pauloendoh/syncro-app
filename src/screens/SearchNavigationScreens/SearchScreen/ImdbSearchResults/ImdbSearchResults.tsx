import { useFocusEffect } from "@react-navigation/native"
import { Spinner, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { useImdbSearchQuery } from "../../../../hooks/react-query/search/useTvSeriesSearchQuery"
import { SyncroItemType } from "../../../../types/domain/SyncroItemType"
import SearchItem from "../SearchItem/SearchItem"

interface Props {
  query: string
  onClickImdbItemId: (imdbItemId: string) => void
  itemType: SyncroItemType
}

const ImdbSearchResults = ({ onClickImdbItemId, query, itemType }: Props) => {
  const { data: imdbItems, isLoading, refetch } = useImdbSearchQuery(
    query,
    itemType
  )

  useFocusEffect(() => {
    refetch()
  })

  const noResults = useMemo(() => !isLoading && imdbItems?.length === 0, [
    isLoading,
    imdbItems,
  ])

  return (
    <VStack mt={4} space={4}>
      {isLoading && <Spinner size="lg" color="primary.500" />}
      {noResults ? (
        <Text>
          {itemType === "tv series"
            ? "No TV series found :("
            : "No movies found :("}
        </Text>
      ) : (
        imdbItems?.map((imdbItem) => (
          <SearchItem
            resultItem={imdbItem}
            key={imdbItem.id}
            onClick={() => onClickImdbItemId(imdbItem.id)}
          />
        ))
      )}
    </VStack>
  )
}

export default ImdbSearchResults
