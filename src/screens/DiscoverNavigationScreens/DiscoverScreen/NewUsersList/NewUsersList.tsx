import { VStack } from "native-base"
import React from "react"
import { useNewUsersQuery } from "../../../../hooks/react-query/user/useNewUsersQuery"
import UserSearchItem from "../../../SearchNavigationScreens/SearchScreen/UserSearchResults/UserSearchItem/UserSearchItem"

interface Props {
  onPressUserId: (userId: string) => void
}

const NewUsersList = (props: Props) => {
  const { data: users } = useNewUsersQuery()
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

export default NewUsersList
