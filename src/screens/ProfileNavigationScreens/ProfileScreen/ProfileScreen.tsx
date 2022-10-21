import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native"
import { HStack, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { ScrollView } from "react-native"
import { useUserRatingsQuery } from "../../../hooks/react-query/rating/useUserRatingsQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
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

  const {
    data: userRatings,
    refetch: refetchUserRatings,
  } = useUserRatingsQuery(route.params.userId)

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

  const tvSeriesRatings = useMemo(
    () => userRatings?.filter((r) => r.imdbItemId) || [],
    [userRatings]
  )

  const highestTvSeriesRating = useMemo(() => {
    if (!userRatings) return null
    return userRatings
      ?.filter((r) => r.imdbItemId)
      .reduce((highestRating, current) => {
        if (current.ratingValue && current.ratingValue > highestRating)
          return current.ratingValue

        return highestRating
      }, 0)
  }, [userRatings])

  const randomHighestTvSeriesRating = useMemo(() => {
    if (!userRatings || !highestTvSeriesRating) return null
    const highestRatedItems = userRatings.filter(
      (r) => r.ratingValue === highestTvSeriesRating
    )

    return highestRatedItems[
      getRandomIntInclusive(0, highestRatedItems.length - 1)
    ]
  }, [highestTvSeriesRating, userRatings])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <HStack
          mt={8}
          style={{
            flexWrap: "wrap",
          }}
        >
          {randomHighestTvSeriesRating && userRatings ? (
            <ProfileScreenRatingItem
              thumbnailImdbItemId={randomHighestTvSeriesRating.imdbItemId!}
              ratingsCount={userRatings.length}
              userId={route.params.userId}
              onClick={() =>
                navigation.navigate("UserRatings", {
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
