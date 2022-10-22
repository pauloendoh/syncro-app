import { FontAwesome } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { HStack, Spinner, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { useUserSearchQuery } from "../../../../hooks/react-query/search/useUserSearchQuery"
import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"

interface Props {
  query: string
  onClickUser: (user: UserSimpleDto) => void
}

const UserSearchResults = (props: Props) => {
  const { data: users, refetch, isLoading } = useUserSearchQuery(props.query)

  useFocusEffect(() => {
    refetch()
  })

  const noResults = useMemo(() => !isLoading && users?.length === 0, [
    isLoading,
    users,
  ])

  const theme = useTheme()
  return (
    <VStack mt={4} space={4}>
      {isLoading && <Spinner size="lg" color="primary.500" />}

      {noResults ? (
        <Text>No users found :(</Text>
      ) : (
        users?.map((user) => (
          <Pressable key={user.id} onPress={() => props.onClickUser(user)}>
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
        ))
      )}
    </VStack>
  )
}

export default UserSearchResults
