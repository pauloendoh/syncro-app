import { CompositeScreenProps } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, Button, HStack, Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { Pressable } from "react-native"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useFollowersQuery } from "../../../hooks/react-query/follow/useFollowersQuery"
import { useFollowingUsersQuery } from "../../../hooks/react-query/follow/useFollowingUsersQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import { syncroItemTypes } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { shortNumberFormatter } from "../../../utils/math/shortNumberFormatter"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"
import ProfileAuthUserMenu from "./ProfileAuthUserMenu/ProfileAuthUserMenu"
import ProfileImageProfileScreen from "./ProfileImageProfileScreen/ProfileImageProfileScreen"
import ProfileInfoProfileScreen from "./ProfileInfoProfileScreen/ProfileInfoProfileScreen"
import ProfileScreenButtons from "./ProfileScreenButtons/ProfileScreenButtons"
import ProfileScreenRatingItem from "./ProfileScreenRatingItem/ProfileScreenRatingItem"

export type ProfileScreenNavigationProp = CompositeScreenProps<
  NativeStackScreenProps<ProfileScreenTypes, "Profile">,
  CompositeScreenProps<
    NativeStackScreenProps<SearchScreenTypes, "Profile">,
    NativeStackScreenProps<DiscoverScreenTypes, "Profile">
  >
>

const ProfileScreen = ({ navigation, route }: ProfileScreenNavigationProp) => {
  const {
    data: followersFollows,

    refetch: refetchFollowers,
  } = useFollowersQuery(route.params.userId)
  const {
    data: followingUsersFollows,
    refetch: refetchFollowing,
  } = useFollowingUsersQuery(route.params.userId)

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

  const [refreshedAt, setRefreshedAt] = useState(new Date().toISOString())

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView
        refreshing={isLoading}
        onRefresh={() => {
          setRefreshedAt(new Date().toISOString())
          refetchUserInfo()
          refetchFollowing()
          refetchFollowers()
        }}
      >
        <VStack px={4} pb={4}>
          <HStackVCenter mt={2} space={6}>
            <ProfileImageProfileScreen userId={route.params.userId} />
            <Pressable
              onPress={() =>
                navigation.push("FollowersScreen", {
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
                navigation.push("FollowersScreen", {
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
                  navigation.push("EditProfile", {
                    initialValues: userInfo!.profile,
                  })
                }
              >
                Edit profile
              </Button>
            ) : (
              <ProfileScreenButtons userId={route.params.userId} />
            )}
          </VStackHCenter>

          <HStack
            mt={2}
            width="100%"
            style={{
              flexWrap: "wrap",
            }}
          >
            {syncroItemTypes.map((itemType) => (
              <ProfileScreenRatingItem
                key={itemType}
                itemType={itemType}
                userId={route.params.userId}
                refreshedAt={refreshedAt}
                onClick={() =>
                  navigation.push("UserItems", {
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
