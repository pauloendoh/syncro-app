import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useFollowersQuery } from "../../../hooks/react-query/follow/useFollowersQuery"
import { useFollowingUsersQuery } from "../../../hooks/react-query/follow/useFollowingUsersQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import UserSearchItem from "../../SearchNavigationScreens/SearchScreen/UserSearchResults/UserSearchItem/UserSearchItem"
import FollowersTabView from "./FollowersTabView/FollowersTabView"

const FollowersScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<ProfileScreenTypes, "FollowersScreen">) => {
  const { lightBackground } = useMyColors()

  const [tabIndex, setTabIndex] = useState(
    route.params.type === "followers" ? 0 : 1
  )

  const { data: userInfo } = useUserInfoQuery(route.params.userId)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: userInfo?.username || "Loading...",
    })
  }, [userInfo])

  const {
    data: followersFollows,
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers,
  } = useFollowersQuery(route.params.userId)
  const {
    data: followingUsersFollows,
    isLoading: isLoadingFollowingUsers,
    refetch: refetchFollowingUsers,
  } = useFollowingUsersQuery(route.params.userId)

  const isLoading = isLoadingFollowers || isLoadingFollowingUsers

  const refetch = () => {
    refetchFollowers()
    refetchFollowingUsers()
  }

  const userList = useMemo(() => {
    if (!followersFollows || !followingUsersFollows) return []

    if (tabIndex === 0) return followersFollows.map((f) => f.follower!)

    return followingUsersFollows.map((f) => f.followingUser!)
  }, [tabIndex, followersFollows, followingUsersFollows])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView onRefresh={refetch} refreshing={isLoading}>
        <VStack px={4}>
          <FollowersTabView
            tabIndex={tabIndex}
            changeTabIndex={setTabIndex}
            followersCount={followersFollows?.length || 0}
            followingUsersCount={followingUsersFollows?.length || 0}
          />

          <Box mt={4} />

          <VStack space={4}>
            {userList.map((user) => (
              <UserSearchItem
                key={user.id}
                user={user}
                onClickUser={() =>
                  navigation.push("Profile", { userId: user.id })
                }
              />
            ))}
          </VStack>
        </VStack>
      </MyScrollView>
    </VStack>
  )
}

export default FollowersScreen
