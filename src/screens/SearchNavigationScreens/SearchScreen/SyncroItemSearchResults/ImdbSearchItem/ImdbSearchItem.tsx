import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import { IImdbResultItem } from "../../../../../types/domain/movie/MovieResultResponseDto"
import { getImageUrlOrDefaultUrl } from "../../../../../utils/getImageUrlOrDefaultUrl"
import SearchItemImdbSection from "./SearchItemImdbSection/SearchItemImdbSection"
import SearchItemYourSection from "./SearchItemYourSection/SearchItemYourSection"

interface Props {
  resultItem: IImdbResultItem
  onClick: () => void
}

// PE 1/3 - unificar no SyncroSearchItem
const ImdbSearchItem = ({ resultItem, onClick }: Props) => {
  const theme = useTheme()

  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myRatingValue = useMemo(
    () =>
      myRatings?.find((rating) => rating.syncroItemId === resultItem.id)
        ?.ratingValue || null,
    [myRatings, resultItem.id]
  )

  const myInterestLevel = useMemo(
    () =>
      myInterests?.find((interest) => interest.syncroItemId === resultItem.id)
        ?.interestLevel || null,
    [myInterests, resultItem.id]
  )

  return (
    <Pressable onPress={onClick}>
      <HStack space="4">
        <Image
          src={getImageUrlOrDefaultUrl(resultItem?.image?.url)}
          width="100px"
          height="100px"
          alt={resultItem.title}
        />

        <VStack style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: "500" }}>
            {resultItem.title} {resultItem.year && `(${resultItem.year})`}
          </Text>

          <HStack mt={2}>
            <VStack style={{ width: 120 }}>
              {resultItem.syncroItem ? (
                <SearchItemImdbSection
                  avgRating={resultItem.syncroItem?.avgRating}
                  ratingCount={resultItem.syncroItem?.ratingCount}
                />
              ) : (
                <Text>See details</Text>
              )}
            </VStack>
            <VStack style={{ width: 120 }}>
              {Boolean(myRatingValue || myInterestLevel) && (
                <SearchItemYourSection itemId={resultItem.id} />
              )}
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default ImdbSearchItem
