import { useFocusEffect } from "@react-navigation/native"
import { Spinner, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { useUserSearchQuery } from "../../../../hooks/react-query/search/useUserSearchQuery"
import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"
import UserSearchItem from "./UserSearchItem/UserSearchItem"

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
          <UserSearchItem
            key={user.id}
            user={user}
            onClickUser={props.onClickUser}
          />
        ))
      )}
    </VStack>
  )
}

export default UserSearchResults
