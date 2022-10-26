import { useTheme } from "native-base"
import { useState } from "react"
import { useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"

const FirstRoute = () => null

const SecondRoute = () => null

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

interface Props {
  tabIndex: number
  changeTabIndex: (tabIndex: number) => void
  followersCount: number
  followingUsersCount: number
}

export default function FollowersTabView(props: Props) {
  const layout = useWindowDimensions()

  const [routes] = useState([
    {
      key: "first",
      title: `${props.followersCount} ${
        props.followersCount > 1 ? " Followers" : " Follower"
      }`,
    },
    { key: "second", title: `${props.followingUsersCount}  Following` },
  ])

  const theme = useTheme()

  console.log({ message: "ronald" })

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
