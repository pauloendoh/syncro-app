import { VStack } from "native-base"
import React from "react"
import { useMostFollowedUsersQuery } from "../../../../hooks/react-query/follow/useMostFollowedUsersQuery"
import UserSearchItem from "../../../SearchNavigationScreens/SearchScreen/UserSearchResults/UserSearchItem/UserSearchItem"

interface Props {
  onPressUserId: (userId: string) => void
}

const PopularUserList = (props: Props) => {
  const { data: users } = useMostFollowedUsersQuery()
  return (
    <VStack space={4}>
      {users?.map((user) => (
        <UserSearchItem
          key={user.id}
          onClickUser={() => props.onPressUserId(user.id)}
          user={user}
        />
      ))}
    </VStack>
  )
}

export default PopularUserList
