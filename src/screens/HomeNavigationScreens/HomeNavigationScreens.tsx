import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "native-base"
import React from "react"
import { HomeScreenTypes } from "../../types/HomeScreenTypes"
import { NavigationParamType } from "../../types/NavigationParamType"
import ImdbItemScreen from "../SearchNavigationScreens/ImdbItemScreen/ImdbItemScreen"
import HomeScreen from "./HomeScreen/HomeScreen"

const Stack = createNativeStackNavigator<HomeScreenTypes>()

const HomeNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "HomeNavigation">) => {
  const theme = useTheme()
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ImdbItem" component={ImdbItemScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigationScreens
