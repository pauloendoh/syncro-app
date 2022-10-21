import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "native-base"
import React from "react"
import { NavigationParamType } from "../../types/NavigationParamType"
import { SearchScreenTypes } from "../../types/SearchScreenTypes"
import ProfileScreen from "../ProfileNavigationScreens/ProfileScreen/ProfileScreen"
import UserItemsScreen from "../ProfileNavigationScreens/UserItemsScreen/UserItemsScreen"
import ImdbItemScreen from "./ImdbItemScreen/ImdbItemScreen"
import SearchScreen from "./SearchScreen/SearchScreen"

const Stack = createNativeStackNavigator<SearchScreenTypes>()

const SearchNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "SearchNavigation">) => {
  const theme = useTheme()
  return (
    <Stack.Navigator
      initialRouteName="Search"
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
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ImdbItem" component={ImdbItemScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserItems" component={UserItemsScreen} />
    </Stack.Navigator>
  )
}

export default SearchNavigationScreens