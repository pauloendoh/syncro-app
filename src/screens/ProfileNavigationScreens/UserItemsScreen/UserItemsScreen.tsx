import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Box, HStack, Image, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import { Pressable, ScrollView } from "react-native"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"

const UserItemsScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<ProfileScreenTypes, "UserItems">) => {
  const { itemType, userId } = route.params

  const theme = useTheme()

  const { data: items, isLoading } = useUserItemsQuery(userId)

  const { data: userInfo } = useUserInfoQuery(route.params.userId)

  const headerTitle = useMemo(() => {
    if (!userInfo?.username) return "User items"

    if (route.params.itemType === "movie")
      return `${userInfo.username} - Movies`

    return `${userInfo.username} - TV Series`
  }, [userInfo, route.params.itemType])

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle,
      }),
    [headerTitle]
  )

  const { lightBackground } = useMyColors()

  const sortedItems = useMemo(() => {
    if (!items) return []
    return items.sort((a, b) => {
      const ratingA = a.ratings?.[0]?.ratingValue
      const ratingB = b.ratings?.[0]?.ratingValue
      if (ratingB && !ratingA) return 1
      if (!ratingA || !ratingB) return -1
      if (ratingB > ratingA) return 1
      return -1
    })
  }, [items])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        {isLoading && <Text>"Loading... "</Text>}

        <VStack paddingX={2} marginTop={4}>
          <Text fontSize="lg">{items?.length} items</Text>

          <VStack space={4} marginTop={4}>
            {sortedItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("ImdbItem", { imdbId: item.id })
                }
              >
                <HStack space="4">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      width="100px"
                      height="100px"
                      alt={item.title}
                    />
                  ) : (
                    <Box width="100px" height="100px" />
                  )}

                  <VStack style={{ flexShrink: 1 }}>
                    <Text style={{ fontWeight: "500" }}>
                      {item.title} ({item.year})
                    </Text>

                    <HStack mt={2}>
                      <VStack style={{ width: 120 }}>
                        <Text fontWeight="semibold">IMDB</Text>
                        {item.id ? (
                          <>
                            <HStackVCenter space={1}>
                              <VStackHCenter style={{ width: 24 }}>
                                <MaterialCommunityIcons
                                  name="star"
                                  color={theme.colors.primary[600]}
                                  size={18}
                                />
                              </VStackHCenter>
                              <Text>{item.ratings?.[0]?.ratingValue}/10</Text>
                            </HStackVCenter>
                            <HStackVCenter space={1}>
                              <VStackHCenter style={{ width: 24 }}>
                                <FontAwesome5
                                  name={"fire"}
                                  color={theme.colors.primary[600]}
                                  size={18}
                                />
                              </VStackHCenter>
                              <Text>
                                {item.interests?.[0]?.interestLevel}/3
                              </Text>
                            </HStackVCenter>
                          </>
                        ) : (
                          <Text>See details</Text>
                        )}
                      </VStack>
                    </HStack>
                  </VStack>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default UserItemsScreen
