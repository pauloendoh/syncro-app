import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NavigationParamType } from "../../types/NavigationParamType"

const EmptyScreen = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "Empty">) => {
  return null
}

export default EmptyScreen
