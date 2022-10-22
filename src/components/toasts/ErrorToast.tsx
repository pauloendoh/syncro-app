import { Text } from "native-base"
import React, { ReactNode } from "react"
import HStackVCenter from "../../screens/_common/flexboxes/HStackVCenter"

interface Props {
  children?: ReactNode
}

const ErrorToast = (props: Props) => {
  return (
    <HStackVCenter py={2} rounded="sm" bgColor="error.500" px={4}>
      <Text textAlign="center">{props.children}</Text>
    </HStackVCenter>
  )
}

export default ErrorToast
