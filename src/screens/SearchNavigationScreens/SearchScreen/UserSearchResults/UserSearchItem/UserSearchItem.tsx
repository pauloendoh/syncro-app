import { HStack, Text, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import UserProfilePicture from "../../../../../components/UserProfilePicture/UserProfilePicture"
import { UserSimpleDto } from "../../../../../types/domain/user/UserSimpleDto"

interface Props {
  user: UserSimpleDto
  onClickUser: (user: UserSimpleDto) => void
}

const UserSearchItem = ({ user, onClickUser }: Props) => {
  return (
    <Pressable key={user.id} onPress={() => onClickUser(user)}>
      <HStack>
        <HStack>
          <UserProfilePicture userId={user.id} widthHeigth={36} />

          <VStack ml={4}>
            <Text>{user.username}</Text>
            <Text></Text>
          </VStack>
        </HStack>
        <HStack width={100}></HStack>
      </HStack>
    </Pressable>
  )
}

export default UserSearchItem
