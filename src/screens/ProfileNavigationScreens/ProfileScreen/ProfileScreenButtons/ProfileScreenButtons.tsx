import React from "react"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"
import FollowUnfollowButton from "./FollowUnfollowButton/FollowUnfollowButton"
import RecommendUserButton from "./RecommendUserButton/RecommendUserButton"

interface Props {
  userId: string
}

const ProfileScreenButtons = (props: Props) => {
  return (
    <HStackVCenter space={2}>
      <FollowUnfollowButton profileUserId={props.userId} />
      <RecommendUserButton userId={props.userId} />
    </HStackVCenter>
  )
}

export default ProfileScreenButtons
