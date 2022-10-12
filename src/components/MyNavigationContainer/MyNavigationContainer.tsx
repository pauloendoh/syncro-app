import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { useTheme } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import { useLogout } from "../../hooks/domain/auth/useLogout"
import EmptyScreen from "../../screens/EmptyScreen/EmptyScreen"
import HomeScreen from "../../screens/HomeScreen/HomeScreen"
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen"
import SearchNavigationScreens from "../../screens/SearchNavigationScreens/SearchNavigationScreens"
import { NavigationParamType } from "../../types/NavigationParamType"
import InterestModal from "../modals/InterestModal/InterestModal"
import RatingModal from "../modals/RatingModal/RatingModal"

interface Props {
  test?: string
}

const Tab = createBottomTabNavigator<NavigationParamType>()

const MyNavigationContainer = (props: Props) => {
  const theme = useTheme()

  const logout = useLogout()

  return (
    <>
      <RatingModal />
      <InterestModal />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.colors.light[900],
              borderTopColor: theme.colors.light[700],
              height: 64,
              paddingBottom: 8,
            },
            tabBarActiveTintColor: theme.colors.primary[700],
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              // headerStyle: {
              //   backgroundColor: "#1E1E1E",
              // },
              // headerTitle: (props) => <HomeTitle />,
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
              // headerStyle: {
              //   backgroundColor: "#1E1E1E",
              // },
              // headerTitle: (props) => <HomeTitle />,
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
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

          <Tab.Screen
            name="Empty"
            component={EmptyScreen}
            options={() => ({
              tabBarLabel: "Logout",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="logout"
                  color={color}
                  size={size}
                />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity {...props} onPress={logout} />
              ),
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MyNavigationContainer
