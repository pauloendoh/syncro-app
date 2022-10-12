import { HStack, VStack } from "native-base"
import React from "react"

type Props = React.ComponentProps<typeof HStack>

const VStackHCenter = (props: Props) => {
  return (
    <VStack alignItems="center" {...props}>
      {props.children}
    </VStack>
  )
}

export default VStackHCenter
