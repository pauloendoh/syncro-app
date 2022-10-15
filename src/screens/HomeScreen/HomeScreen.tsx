import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { useMyColors } from "../../hooks/useMyColors"
import { NavigationParamType } from "../../types/NavigationParamType"

const HomeScreen = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "Home">) => {
  const { lightBackground } = useMyColors()
  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView></ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default HomeScreen
