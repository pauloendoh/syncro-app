import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native"
import { Box, Button, HStack, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { Pressable } from "react-native"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useFollowersQuery } from "../../../hooks/react-query/follow/useFollowersQuery"
import { useFollowingUsersQuery } from "../../../hooks/react-query/follow/useFollowingUsersQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import { syncroItemTypes } from "../../../types/domain/SyncroItemType"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { shortNumberFormatter } from "../../../utils/math/shortNumberFormatter"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"
import FollowUnfollowButton from "./FollowUnfollowButton/FollowUnfollowButton"
import ProfileAuthUserMenu from "./ProfileAuthUserMenu/ProfileAuthUserMenu"
import ProfileImageProfileScreen from "./ProfileImageProfileScreen/ProfileImageProfileScreen"
import ProfileInfoProfileScreen from "./ProfileInfoProfileScreen/ProfileInfoProfileScreen"
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

  const { data: followersFollows } = useFollowersQuery(route.params.userId)
  const { data: followingUsersFollows } = useFollowingUsersQuery(
    route.params.userId
  )

  const {
    data: userInfo,
    isLoading,
    refetch: refetchUserInfo,
  } = useUserInfoQuery(route.params.userId)

  const authUser = useAuthStore((s) => s.authUser)
  const thisIsMyProfile = useMemo(() => authUser?.id === route.params.userId, [
    authUser,
  ])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: userInfo?.username || "Loading...",
    })
  }, [userInfo?.username])

  useFocusEffect(() => {
    refetchUserInfo()
  })

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

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView refreshing={isLoading} onRefresh={refetchUserInfo}>
        <VStack px={4}>
          <HStackVCenter mt={2} space={6}>
            <ProfileImageProfileScreen userId={route.params.userId} />
            <Pressable
              onPress={() =>
                navigation.navigate("FollowersScreen", {
                  type: "followers",
                  userId: route.params.userId,
                })
              }
            >
              <VStackHCenter>
                <Text fontWeight={"semibold"}>
                  {shortNumberFormatter(followersFollows?.length || 0)}
                </Text>
                <Text>Followers</Text>
              </VStackHCenter>
            </Pressable>

            <Pressable
              onPress={() =>
                navigation.navigate("FollowersScreen", {
                  type: "following-users",
                  userId: route.params.userId,
                })
              }
            >
              <VStackHCenter>
                <Text fontWeight={"semibold"}>
                  {shortNumberFormatter(followingUsersFollows?.length || 0)}
                </Text>
                <Text>Following</Text>
              </VStackHCenter>
            </Pressable>
          </HStackVCenter>

          {userInfo?.profile && (
            <Box my={4}>
              <ProfileInfoProfileScreen userProfile={userInfo.profile} />
            </Box>
          )}

          <VStackHCenter mt={2}>
            {thisIsMyProfile ? (
              <Button
                colorScheme="gray"
                width="100%"
                onPress={() =>
                  navigation.navigate("EditProfile", {
                    initialValues: userInfo!.profile,
                  })
                }
              >
                Edit profile
              </Button>
            ) : (
              <FollowUnfollowButton profileUserId={route.params.userId} />
            )}
          </VStackHCenter>

          <HStack
            mt={6}
            space={4}
            style={{
              flexWrap: "wrap",
            }}
          >
            {syncroItemTypes.map((itemType) => (
              <ProfileScreenRatingItem
                key={itemType}
                itemType={itemType}
                userId={route.params.userId}
                onClick={() =>
                  navigation.navigate("UserItems", {
                    userId: route.params.userId,
                    itemType,
                  })
                }
              />
            ))}
          </HStack>
        </VStack>
      </MyScrollView>
    </VStack>
  )
}

export default ProfileScreen
