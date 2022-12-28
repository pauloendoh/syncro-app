import { Box, FlatList } from "native-base"
import React from "react"
import { RefreshControl } from "react-native"
import { useMostFollowedUsersQuery } from "../../../../hooks/react-query/follow/useMostFollowedUsersQuery"
import UserSearchItem from "../../../SearchNavigationScreens/SearchScreen/UserSearchResults/UserSearchItem/UserSearchItem"

interface Props {
  onPressUserId: (userId: string) => void
}

const PopularUserList = (props: Props) => {
  const { data: users, isLoading, refetch } = useMostFollowedUsersQuery()
  return (
    <FlatList
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      data={users}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Box mt={4} />}
      renderItem={({ item }) => (
        <UserSearchItem
          onClickUser={() => props.onPressUserId(item.id)}
          user={item}
        />
      )}
    />
  )
}

export default PopularUserList
