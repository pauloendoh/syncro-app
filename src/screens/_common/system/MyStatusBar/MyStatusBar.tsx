import { ColorValue, StatusBar, StatusBarStyle, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import React from "react"

interface Props {
  backgroundColor?: ColorValue
  barStyle: StatusBarStyle | null | undefined
}

const MyStatusBar = (props: Props) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{ height: insets.top, backgroundColor: props.backgroundColor }}
    >
      <StatusBar
        animated
        backgroundColor={props.backgroundColor}
        barStyle={props.barStyle || "dark-content"}
      />
    </View>
  )
}

export default MyStatusBar
