import { Button } from "native-base"
import React, { useMemo } from "react"
import { useFollowersQuery } from "../../../../../hooks/react-query/follow/useFollowersQuery"
import useRecommendUserSheetStore from "../../../../../hooks/zustand/action-sheets/useRecommendUserSheetStore"
import useAuthStore from "../../../../../hooks/zustand/useAuthStore"

interface Props {
  userId: string
}

const RecommendUserButton = (props: Props) => {
  const { openActionSheet } = useRecommendUserSheetStore()

  const { authUser } = useAuthStore()
  const { data: myFollowers } = useFollowersQuery(authUser?.id)

  const followsMe = useMemo(
    () =>
      myFollowers?.some((follower) => follower.id === props.userId) ?? false,
    [myFollowers, props.userId]
  )

  return (
    <Button
      flex={1}
      colorScheme="gray"
      onPress={() => {
        if (followsMe) {
          openActionSheet(props.userId)
          return
        }

        alert("You can only recommend items to users that follow you.")
      }}
      _text={{
        color: followsMe ? "white" : "gray.400",
      }}
    >
      Recommend
    </Button>
  )
}

export default RecommendUserButton
