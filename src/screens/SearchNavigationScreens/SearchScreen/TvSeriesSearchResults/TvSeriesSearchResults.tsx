import { useFocusEffect } from "@react-navigation/native"
import React from "react"
import { useTvSeriesSearchQuery } from "../../../../hooks/react-query/search/useTvSeriesSearchQuery"
import SearchItem from "../SearchItem/SearchItem"

interface Props {
  query: string
  onClickImdbItemId: (imdbItemId: string) => void
}

const TvSeriesSearchResults = ({ onClickImdbItemId, query }: Props) => {
  const { data: imdbItems, refetch } = useTvSeriesSearchQuery(query)

  useFocusEffect(() => {
    refetch()
  })
  return (
    <>
      {imdbItems?.map((imdbItem) => (
        <SearchItem
          resultItem={imdbItem}
          key={imdbItem.id}
          onClick={() => onClickImdbItemId(imdbItem.id)}
        />
      ))}
    </>
  )
}

export default TvSeriesSearchResults
