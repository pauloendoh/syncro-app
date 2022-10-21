import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

const UserItemsScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<ProfileScreenTypes, "UserItems">) => {
  const { itemType, userId } = route.params

  const { data: items, isLoading } = useUserItemsQuery(userId)

  const { lightBackground } = useMyColors()
  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        {isLoading && <Text>"Loading... "</Text>}
        {items?.map((item) => (
          <HStack>
            <Text>{item.title}</Text>
            <Text>
              <VStack>
                <Text>{item.ratings?.[0]?.ratingValue || "?"}/10 rating</Text>
              </VStack>

              <VStack>
                <Text>
                  {item.interests?.[0]?.interestLevel || "?"}/3 interest
                </Text>
              </VStack>
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </VStack>
  )
}

export default UserItemsScreen
