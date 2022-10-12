import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { NavigationParamType } from "../../types/NavigationParamType"
import { SearchScreenTypes } from "../../types/SearchScreenTypes"
import ImdbItemScreen from "./ImdbItemScreen/ImdbItemScreen"
import SearchScreen from "./SearchScreen/SearchScreen"

const Stack = createNativeStackNavigator<SearchScreenTypes>()

const SearchNavigationScreens = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "SearchNavigation">) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ImdbItem" component={ImdbItemScreen} />
    </Stack.Navigator>
  )
}

export default SearchNavigationScreens
