import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native"
import { Box, HStack, Spinner, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { ScrollView } from "react-native"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { getRandomIntInclusive } from "../../../utils/math/getRandomIntInclusive"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"
import FollowUnfollowButton from "./FollowUnfollowButton/FollowUnfollowButton"
import ProfileAuthUserMenu from "./ProfileAuthUserMenu/ProfileAuthUserMenu"
import ProfileScreenRatingItem from "./ProfileScreenRatingItem/ProfileScreenRatingItem"

export type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<ProfileScreenTypes, "Profile">,
  CompositeScreenProps<
    BottomTabScreenProps<SearchScreenTypes, "Profile">,
    BottomTabScreenProps<DiscoverScreenTypes, "Profile">
  >
>

const ProfileScreen = ({ navigation, route }: ProfileScreenNavigationProp) => {
  const theme = useTheme()

  const {
    data: userItems,
    refetch: refetchUserRatings,
    isLoading: isLoadingUserRatings,
  } = useUserItemsQuery(route.params.userId)

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading: isLoadingUserInfo,
  } = useUserInfoQuery(route.params.userId)

  const authUser = useAuthStore((s) => s.authUser)
  const thisIsMyProfile = useMemo(() => authUser?.id === route.params.userId, [
    authUser,
  ])

  useFocusEffect(() => {
    refetchUserInfo()
    refetchUserRatings()
  })

  const isLoading = useMemo(() => isLoadingUserInfo || isLoadingUserRatings, [
    isLoadingUserInfo,
    isLoadingUserRatings,
  ])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: userInfo?.username || "Loading...",
    })
  }, [userInfo])

  useEffect(() => {
    if (thisIsMyProfile) {
      navigation.setOptions({
        headerRight: (props) => (
          <Box {...props}>
            <ProfileAuthUserMenu />
          </Box>
        ),
      })
    }
  }, [thisIsMyProfile])

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
        {isLoading && (
          <VStackHCenter mt={4}>
            <Spinner size={"lg"} color="primary.500" />
          </VStackHCenter>
        )}

        <VStackHCenter mt={2}>
          {thisIsMyProfile ? null : (
            <FollowUnfollowButton profileUserId={route.params.userId} />
          )}
        </VStackHCenter>

        <HStack
          mt={6}
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
            !isLoading && <Text>No ratings :(</Text>
          )}
        </HStack>
      </ScrollView>
    </VStack>
  )
}

export default ProfileScreen
