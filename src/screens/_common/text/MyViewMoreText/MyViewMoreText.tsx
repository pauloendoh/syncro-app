import { Text } from "native-base"
import React from "react"
import ViewMoreText from "react-native-view-more-text"

type Props = React.ComponentProps<typeof ViewMoreText>

const MyViewMoreText = (props: Props) => {
  return (
    <ViewMoreText
      {...props}
      renderViewLess={(onPress) => (
        <Text onPress={onPress} fontWeight="bold">
          View less
        </Text>
      )}
      renderViewMore={(onPress) => (
        <Text onPress={onPress} fontWeight="bold">
          View more
        </Text>
      )}
    >
      {props.children}
    </ViewMoreText>
  )
}

export default MyViewMoreText
