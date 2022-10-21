import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native"
import { HStack, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { ScrollView } from "react-native"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { getRandomIntInclusive } from "../../../utils/math/getRandomIntInclusive"
import ProfileScreenRatingItem from "./ProfileScreenRatingItem/ProfileScreenRatingItem"

export type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<ProfileScreenTypes, "Profile", undefined>,
  BottomTabScreenProps<SearchScreenTypes, "Profile", undefined>
>

const ProfileScreen = ({ navigation, route }: ProfileScreenNavigationProp) => {
  const theme = useTheme()

  const { data: userItems, refetch: refetchUserRatings } = useUserItemsQuery(
    route.params.userId
  )

  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery(
    route.params.userId
  )

  useFocusEffect(() => {
    refetchUserInfo()
    refetchUserRatings()
  })

  useEffect(() => {
    navigation.setOptions({
      headerTitle: userInfo?.username || "Loading...",
    })
  }, [userInfo])

  const { lightBackground } = useMyColors()

  const highestTvSeriesRating = useMemo(() => {
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

  const randomHighestImdbId = useMemo(() => {
    if (!userItems || !highestTvSeriesRating) return null
    const highestRatedItems = userItems.filter(
      (item) => item.ratings?.[0]?.ratingValue === highestTvSeriesRating
    )

    return highestRatedItems[
      getRandomIntInclusive(0, highestRatedItems.length - 1)
    ].id
  }, [highestTvSeriesRating, userItems])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <HStack
          mt={8}
          style={{
            flexWrap: "wrap",
          }}
        >
          {randomHighestImdbId && userItems ? (
            <ProfileScreenRatingItem
              thumbnailImdbItemId={randomHighestImdbId}
              ratingsCount={userItems.length}
              userId={route.params.userId}
              onClick={() =>
                navigation.navigate("UserItems", {
                  userId: route.params.userId,
                  itemType: "tv series",
                })
              }
            />
          ) : (
            <Text>No ratings :(</Text>
          )}
        </HStack>
      </ScrollView>
    </VStack>
  )
}

export default ProfileScreen
