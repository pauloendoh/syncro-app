import { HStack, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import UserProfilePicture from "../../../../../components/UserProfilePicture/UserProfilePicture"
import useAuthStore from "../../../../../hooks/zustand/useAuthStore"
import { UserSimpleDto } from "../../../../../types/domain/user/UserSimpleDto"
import FollowUnfollowButton from "../../../../ProfileNavigationScreens/ProfileScreen/FollowUnfollowButton/FollowUnfollowButton"

interface Props {
  user: UserSimpleDto
  onClickUser: (user: UserSimpleDto) => void
}

const UserSearchItem = ({ user, onClickUser }: Props) => {
  const authUser = useAuthStore((s) => s.authUser)
  const itsAuthUser = useMemo(() => authUser?.id === user.id, [authUser])

  return (
    <Pressable key={user.id} onPress={() => onClickUser(user)}>
      <HStack justifyContent="space-between">
        <HStack>
          <UserProfilePicture userId={user.id} widthHeigth={36} />

          <VStack ml={4}>
            <Text>{user.username}</Text>
            <Text></Text>
          </VStack>
        </HStack>
        <HStack width={100}>
          {!itsAuthUser && <FollowUnfollowButton profileUserId={user.id} />}
        </HStack>
      </HStack>
    </Pressable>
  )
}

export default UserSearchItem
