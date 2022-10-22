import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "native-base"
import React from "react"
import { DiscoverScreenTypes } from "../../types/DiscoverScreenTypes"
import { NavigationParamType } from "../../types/NavigationParamType"
import ProfileScreen from "../ProfileNavigationScreens/ProfileScreen/ProfileScreen"
import UserItemsScreen from "../ProfileNavigationScreens/UserItemsScreen/UserItemsScreen"
import ImdbItemScreen from "../SearchNavigationScreens/ImdbItemScreen/ImdbItemScreen"
import DiscoverScreen from "./DiscoverScreen/DiscoverScreen"

const Stack = createNativeStackNavigator<DiscoverScreenTypes>()

const DiscoverNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "DiscoverNavigation">) => {
  const theme = useTheme()
  return (
    <Stack.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.light[900],
        },
        headerTitleStyle: {
          color: theme.colors.light[100],
        },
        headerTintColor: theme.colors.light[100],
      }}
    >
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserItems" component={UserItemsScreen} />
      <Stack.Screen name="ImdbItem" component={ImdbItemScreen} />
    </Stack.Navigator>
  )
}

export default DiscoverNavigationScreens
