import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import type { CompositeScreenProps } from "@react-navigation/native"
import { HStack, Pressable, Text, useTheme, VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { useUserRatingsQuery } from "../../../hooks/react-query/rating/useUserRatingsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"

import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"

const ProfileScreen = ({
  navigation,
  route,
}: CompositeScreenProps<
  BottomTabScreenProps<ProfileScreenTypes, "Profile">,
  BottomTabScreenProps<SearchScreenTypes, "Profile">
>) => {
  const { data: userRatings } = useUserRatingsQuery(route.params.userId)
  const theme = useTheme()

  const { lightBackground } = useMyColors()
  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 8 }}>
        <HStack
          style={{
            flexWrap: "wrap",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("UserRatings", {
                itemType: "tv series",
                userId: route.params.userId,
              })
            }}
          >
            <VStackHCenter
              style={{
                backgroundColor: theme.colors.light[500],
                padding: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontWeight: "500" }}>TV Series</Text>
              <Text>{userRatings?.length} ratings</Text>
            </VStackHCenter>
          </Pressable>
        </HStack>
      </ScrollView>
    </VStack>
  )
}

export default ProfileScreen
