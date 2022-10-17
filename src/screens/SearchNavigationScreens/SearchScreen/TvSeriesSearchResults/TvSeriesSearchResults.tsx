import React from "react"
import { useTvSeriesSearchQuery } from "../../../../hooks/react-query/search/useTvSeriesSearchQuery"
import SearchItem from "../SearchItem/SearchItem"

interface Props {
  query: string
  onClickImdbItemId: (imdbItemId: string) => void
}

const TvSeriesSearchResults = ({ onClickImdbItemId, query }: Props) => {
  const { data: imdbItems } = useTvSeriesSearchQuery(query)
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
