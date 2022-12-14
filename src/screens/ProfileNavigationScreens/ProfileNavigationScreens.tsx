import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "native-base"
import React from "react"
import useAuthStore from "../../hooks/zustand/useAuthStore"
import { NavigationParamType } from "../../types/NavigationParamType"
import { ProfileScreenTypes } from "../../types/ProfileScreenTypes"
import SyncroItemScreen from "../SearchNavigationScreens/SyncroItemScreen/SyncroItemScreen"
import EditProfileScreen from "./EditProfileScreen/EditProfileScreen"
import FollowersScreen from "./FollowersScreen/FollowersScreen"
import ProfileScreen from "./ProfileScreen/ProfileScreen"
import UserItemsScreen from "./UserItemsScreen/UserItemsScreen"

const Stack = createNativeStackNavigator<ProfileScreenTypes>()

const ProfileNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "ProfileNavigation">) => {
  const theme = useTheme()

  const authUser = useAuthStore((s) => s.authUser)

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
      {authUser && (
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ userId: authUser.id }}
        />
      )}

      <Stack.Screen name="UserItems" component={UserItemsScreen} />
      <Stack.Screen name="SyncroItem" component={SyncroItemScreen} />
      <Stack.Screen name="FollowersScreen" component={FollowersScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigationScreens
