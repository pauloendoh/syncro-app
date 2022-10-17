import { Text, useTheme, VStack } from "native-base"
import { useState } from "react"
import { useWindowDimensions, View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

const FirstRoute = () => (
  <VStack style={{ flex: 1, backgroundColor: "#ff4081" }}>
    <Text>test</Text>
  </VStack>
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#00000000" }} />
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: SecondRoute,
})

interface Props {
  tabIndex: number
  changeTabIndex: (tabIndex: number) => void
}

export default function TabViewExample(props: Props) {
  const layout = useWindowDimensions()

  const [routes] = useState([
    { key: "first", title: "TV series" },
    // { key: "second", title: "Movies" },
    { key: "third", title: "Users" },
  ])

  const theme = useTheme()

  return (
    <TabView
      renderTabBar={(p) => (
        <TabBar
          {...p}
          style={{ backgroundColor: "#00000000" }}
          pressColor="#00000000"
          indicatorStyle={{
            backgroundColor: theme.colors.primary[600],
          }}
        />
      )}
      navigationState={{ index: props.tabIndex, routes }}
      renderScene={renderScene}
      onIndexChange={props.changeTabIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
