import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Text, VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { NavigationParamType } from "../../types/NavigationParamType"
import { myColors } from "../../utils/myColors"

const ProfileScreen = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "Profile">) => {
  return (
    <VStack flex="1" backgroundColor={myColors.background}>
      <ScrollView>
        <Text>Profile</Text>
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default ProfileScreen
