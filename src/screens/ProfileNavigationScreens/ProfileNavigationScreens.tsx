import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { NavigationParamType } from "../../types/NavigationParamType"
import { ProfileScreenTypes } from "../../types/ProfileScreenTypes"
import ProfileScreen from "./ProfileScreen/ProfileScreen"
import UserRatingsScreen from "./UserRatingsScreen/UserRatingsScreen"

const Stack = createNativeStackNavigator<ProfileScreenTypes>()

const ProfileNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "ProfileNavigation">) => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserRatings" component={UserRatingsScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigationScreens
