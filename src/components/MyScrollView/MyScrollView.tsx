import { ScrollView } from "native-base"
import React, { ReactNode } from "react"
import { RefreshControl } from "react-native"

interface Props {
  refreshing: boolean
  onRefresh: () => void
  children: ReactNode
}

const MyScrollView = (props: Props) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
    >
      {props.children}
    </ScrollView>
  )
}

export default MyScrollView
