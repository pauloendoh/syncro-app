import { Image } from "react-native"

import { Box, Pressable, Text } from "native-base"
import React, { useEffect, useMemo } from "react"
import { useSyncroItemDetailsQuery } from "../../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery"
import { useUserItemsQuery } from "../../../../hooks/react-query/user/useUserItemsQuery"
import { syncroItemMapping } from "../../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { getRandomIntInclusive } from "../../../../utils/math/getRandomIntInclusive"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"

interface Props {
  userId: string
  onClick: () => void
  itemType: SyncroItemType
  refreshedAt: string
}

const ProfileScreenRatingItem = (props: Props) => {
  const {
    data: userItems,
    refetch: refetchUserRatings,
    isLoading: isLoadingUserRatings,
  } = useUserItemsQuery(props.userId, props.itemType)

  useEffect(() => {
    refetchUserRatings()
  }, [props.refreshedAt])

  const highestItemRating = useMemo(() => {
    if (!userItems) return null
    return userItems.reduce((highestRating, current) => {
      const ratingValue =
        current.ratings &&
        current.ratings[0] &&
        current.ratings[0].ratingValue &&
        current.ratings[0].ratingValue
      if (ratingValue && ratingValue > highestRating) return ratingValue

      return highestRating
    }, 0)
  }, [userItems])

  const randomHighestItemId = useMemo(() => {
    if (highestItemRating === 0 && userItems && userItems.length > 0)
      return userItems[0].id
    if (!userItems || !highestItemRating) return null
    const highestRatedItems = userItems.filter(
      (item) => item.ratings?.[0]?.ratingValue === highestItemRating
    )

    return highestRatedItems[
      getRandomIntInclusive(0, highestRatedItems.length - 1)
    ].id
  }, [highestItemRating, userItems])

  const { data: randomHighestItem } = useSyncroItemDetailsQuery(
    randomHighestItemId
  )

  const label = useMemo(() => syncroItemMapping[props.itemType].labelPlural, [
    props.itemType,
  ])

  if (userItems?.length === 0) return null

  return (
    <Pressable
      onPress={() => {
        props.onClick()
      }}
    >
      <VStackHCenter width={150} mt={4}>
        {randomHighestItem?.imageUrl ? (
          <Image
            source={{ uri: randomHighestItem?.imageUrl }}
            style={{
              width: 150,
              height: 150,
            }}
          />
        ) : (
          <Box width={150} height={150} />
        )}

        <Text style={{ fontWeight: "500" }} mt={1}>
          {label}
        </Text>
        <Text>{userItems?.length} items</Text>
      </VStackHCenter>
    </Pressable>
  )
}

export default ProfileScreenRatingItem
