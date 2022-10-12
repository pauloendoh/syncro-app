import { Text } from "native-base"
import React from "react"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"

const HomeTitle = () => {
  const authUser = useAuthStore((s) => s.authUser)
  return (
    <HStackVCenter flex="1" justifyContent="space-between">
      <Text>{authUser?.username}</Text>
    </HStackVCenter>
  )
}

export default HomeTitle
