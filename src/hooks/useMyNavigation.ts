import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { HomeScreenTypes } from "../types/HomeScreenTypes"

export const useMyNavigation = () => {
  return useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
}
