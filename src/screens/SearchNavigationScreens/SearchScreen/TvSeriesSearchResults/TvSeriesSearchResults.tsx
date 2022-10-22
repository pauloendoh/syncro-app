import { useFocusEffect } from "@react-navigation/native"
import { Spinner, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { useTvSeriesSearchQuery } from "../../../../hooks/react-query/search/useTvSeriesSearchQuery"
import SearchItem from "../SearchItem/SearchItem"

interface Props {
  query: string
  onClickImdbItemId: (imdbItemId: string) => void
}

const TvSeriesSearchResults = ({ onClickImdbItemId, query }: Props) => {
  const { data: imdbItems, isLoading, refetch } = useTvSeriesSearchQuery(query)

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
        <Text>No TV series found :(</Text>
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

export default TvSeriesSearchResults
