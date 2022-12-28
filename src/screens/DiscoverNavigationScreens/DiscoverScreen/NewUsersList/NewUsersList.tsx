import { Box, FlatList } from "native-base"
import React from "react"
import { RefreshControl } from "react-native"
import { useNewUsersQuery } from "../../../../hooks/react-query/user/useNewUsersQuery"
import UserSearchItem from "../../../SearchNavigationScreens/SearchScreen/UserSearchResults/UserSearchItem/UserSearchItem"

interface Props {
  onPressUserId: (userId: string) => void
}

const NewUsersList = (props: Props) => {
  const { data: users, isLoading, refetch } = useNewUsersQuery()
  return (
    <FlatList
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      data={users}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Box mt={4} />}
      renderItem={({ item: user }) => (
        <UserSearchItem
          onClickUser={() => props.onPressUserId(user.id)}
          user={user}
        />
      )}
    />
  )
}

export default NewUsersList
