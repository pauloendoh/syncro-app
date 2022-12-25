import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { useTheme } from "native-base"
import React from "react"
import { Platform } from "react-native"
import useRecommendItemActionSheetStore from "../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import useNavigationStore from "../../hooks/zustand/useNavigationStore"
import DiscoverNavigationScreens from "../../screens/DiscoverNavigationScreens/DiscoverNavigationScreens"
import HomeNavigationScreens from "../../screens/HomeNavigationScreens/HomeNavigationScreens"
import ProfileNavigationScreens from "../../screens/ProfileNavigationScreens/ProfileNavigationScreens"
import SearchNavigationScreens from "../../screens/SearchNavigationScreens/SearchNavigationScreens"
import { NavigationParamType } from "../../types/NavigationParamType"
import GlobalActionSheets from "../action-sheets/GlobalActionSheets"
import GlobalModals from "../modals/GlobalModals"
import PushNotificationHandler from "./PushNotificationHandler"

interface Props {
  test?: string
}

const Tab = createBottomTabNavigator<NavigationParamType>()

const MyNavigationContainer = (props: Props) => {
  const theme = useTheme()
  const itemId = useRecommendItemActionSheetStore((s) => s.itemId)
  const { setIsReady } = useNavigationStore()

  return (
    <>
      <GlobalActionSheets />

      <NavigationContainer
        onReady={() => {
          console.log({ navigationIsReady: true })
          setIsReady(true)
        }}
      >
        {/* must be inside navigation container */}
        <PushNotificationHandler />

        <GlobalModals />

        <Tab.Navigator
          initialRouteName="HomeNavigation"
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.light[900],
              borderTopColor: theme.colors.light[800],
              height: Platform.OS === "android" ? 56 : 56,
              paddingBottom: 0,
            },
            tabBarActiveTintColor: theme.colors.primary[700],
          }}
        >
          <Tab.Screen
            name="HomeNavigation"
            component={HomeNavigationScreens}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SearchNavigation"
            component={SearchNavigationScreens}
            options={{
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={color}
                  size={size}
                />
              ),
            }}
          />

          <Tab.Screen
            name="DiscoverNavigation"
            component={DiscoverNavigationScreens}
            options={{
              tabBarLabel: "Discover",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="compass"
                  color={color}
                  size={size}
                />
              ),
            }}
          />

          <Tab.Screen
            name="ProfileNavigation"
            component={ProfileNavigationScreens}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),

              // headerStyle: {
              //   backgroundColor: "#1E1E1E",
              // },
              // headerTitle: (props) => <HomeTitle />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MyNavigationContainer
