import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { useItemsRatedByUserQuery } from "../../../hooks/react-query/imdb-item/useItemsRatedByUserQuery"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import { myColors } from "../../../utils/myColors"

const UserRatingsScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<ProfileScreenTypes, "UserRatings">) => {
  const { itemType, userId } = route.params

  const { data: items, isLoading } = useItemsRatedByUserQuery(userId)

  return (
    <VStack flex="1" backgroundColor={myColors.background}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        {isLoading && <Text>"Loading... "</Text>}
        {items?.map((item) => (
          <HStack>
            <Text>{item.title}</Text>
            <Text>
              {item.ratings?.map((rating) => (
                <VStack>
                  <Text>{rating.value}/10 rating</Text>
                  <Text>{rating.interestLevel}/3 interest</Text>
                </VStack>
              ))}
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </VStack>
  )
}

export default UserRatingsScreen
