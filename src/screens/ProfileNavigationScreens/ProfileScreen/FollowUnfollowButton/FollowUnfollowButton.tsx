import { Button } from "native-base"
import React, { useMemo } from "react"
import { useMyFollowingUsersQuery } from "../../../../hooks/react-query/follow/useMyFollowingUsersQuery"
import useToggleFollowMutation from "../../../../hooks/react-query/follow/useToggleFollowMutation"

interface Props {
  profileUserId: string
}

const FollowUnfollowButton = (props: Props) => {
  const { data: myFollowingUsers, isLoading } = useMyFollowingUsersQuery()

  const alreadyFollowing = useMemo(() => {
    if (!myFollowingUsers) return false

    return myFollowingUsers.find(
      (f) => f.followingUserId === props.profileUserId
    )
  }, [myFollowingUsers])

  const { mutate: submitToggleFollow } = useToggleFollowMutation()

  const label = useMemo(() => {
    if (isLoading) return "Loading..."

    if (alreadyFollowing) return "Following"
    return "Follow"
  }, [isLoading, alreadyFollowing])

  return (
    <Button
      isLoading={isLoading}
      width="100%"
      colorScheme={alreadyFollowing ? "gray" : "secondary"}
      onPress={() => submitToggleFollow(props.profileUserId)}
    >
      {label}
    </Button>
  )
}

export default FollowUnfollowButton
