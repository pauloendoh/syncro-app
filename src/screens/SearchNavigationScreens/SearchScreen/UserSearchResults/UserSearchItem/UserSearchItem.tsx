import { FontAwesome } from "@expo/vector-icons"
import { HStack, Text, theme, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
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
          <FontAwesome
            name="user-circle-o"
            size={36}
            color={theme.colors.dark[900]}
          />
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
