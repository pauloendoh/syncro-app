import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "native-base"
import React from "react"
import { NavigationParamType } from "../../types/NavigationParamType"
import { ProfileScreenTypes } from "../../types/ProfileScreenTypes"
import ProfileScreen from "./ProfileScreen/ProfileScreen"
import UserRatingsScreen from "./UserRatingsScreen/UserRatingsScreen"

const Stack = createNativeStackNavigator<ProfileScreenTypes>()

const ProfileNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "ProfileNavigation">) => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="Profile"
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
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserRatings" component={UserRatingsScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigationScreens
