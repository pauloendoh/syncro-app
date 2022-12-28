import { useTheme } from "native-base"
import { useState } from "react"
import { useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

const renderScene = SceneMap({
  first: () => null,
  second: () => null,
  third: () => null,
})

interface Props {
  tabIndex: number
  changeTabIndex: (tabIndex: number) => void
}

export default function DiscoverScreenTabView(props: Props) {
  const layout = useWindowDimensions()

  const [routes] = useState([
    { key: "first", title: "Popular Users" },
    { key: "second", title: "Rating Similarity" },
    { key: "third", title: "New Users" },
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
          scrollEnabled
          tabStyle={{ width: 140 }}
          labelStyle={{ textTransform: "none", fontWeight: "bold" }}
        />
      )}
      navigationState={{ index: props.tabIndex, routes }}
      renderScene={renderScene}
      onIndexChange={props.changeTabIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
