import { useTheme } from "native-base"
import { useState } from "react"
import { useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

const renderScene = SceneMap({
  first: () => null,
  second: () => null,
  third: () => null,
  forth: () => null,
  fifth: () => null,
})

interface Props {
  tabIndex: number
  changeTabIndex: (tabIndex: number) => void
}

export default function SearchScreenTabView(props: Props) {
  const layout = useWindowDimensions()

  const [routes] = useState([
    { key: "first", title: "TV series" },
    { key: "second", title: "Movies" },
    { key: "third", title: "Games" },
    { key: "forth", title: "Manga" },
    { key: "fifth", title: "Users" },
  ])

  const theme = useTheme()

  return (
    <TabView
      renderTabBar={(p) => (
        <TabBar
          scrollEnabled
          {...p}
          tabStyle={{ width: 100 }}
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
