import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import { SyncroItemDto } from "../../../../../types/domain/syncro-item/SyncroItemDto"
import { syncroItemMapping } from "../../../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping"
import { getImageUrlOrDefaultUrl } from "../../../../../utils/getImageUrlOrDefaultUrl"
import SearchItemImdbSection from "../ImdbSearchItem/SearchItemImdbSection/SearchItemImdbSection"
import SearchItemYourSection from "../ImdbSearchItem/SearchItemYourSection/SearchItemYourSection"

interface Props {
  syncroItem: SyncroItemDto
  onClick: () => void
}

const SyncroSearchItem = ({ syncroItem, onClick }: Props) => {
  const theme = useTheme()

  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myRatingValue = useMemo(
    () =>
      myRatings?.find((rating) => rating.syncroItemId === syncroItem.id)
        ?.ratingValue || 0,
    [myRatings, syncroItem]
  )

  const myInterestLevel = useMemo(
    () =>
      myInterests?.find((interest) => interest.syncroItemId === syncroItem.id)
        ?.interestLevel || 0,
    [myInterests, syncroItem]
  )

  return (
    <Pressable onPress={onClick}>
      <HStack space="4">
        <Image
          src={getImageUrlOrDefaultUrl(syncroItem.imageUrl)}
          width="100px"
          height="100px"
          alt={syncroItem.title}
        />

        <VStack style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: "500" }}>
            {syncroItem.title} {syncroItem.year && `(${syncroItem.year})`}
          </Text>

          <HStack mt={2}>
            <VStack style={{ width: 120 }}>
              {syncroItem.ratingCount ? (
                <SearchItemImdbSection
                  avgRating={syncroItem.avgRating}
                  ratingCount={syncroItem.ratingCount}
                  title={syncroItemMapping[syncroItem.type].site}
                />
              ) : (
                <Text>See details</Text>
              )}
            </VStack>
            <VStack style={{ width: 120 }}>
              {Boolean(myRatingValue || myInterestLevel) && (
                <SearchItemYourSection itemId={syncroItem.id} />
              )}
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default SyncroSearchItem
