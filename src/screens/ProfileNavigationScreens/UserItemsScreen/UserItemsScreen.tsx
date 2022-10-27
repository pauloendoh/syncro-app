import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Box, HStack, Image, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { Pressable, ScrollView } from "react-native"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { SortingByTypes } from "../../../types/domain/others/SortingByTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import SearchItemYourSection from "../../SearchNavigationScreens/SearchScreen/SearchItem/SearchItemYourSection/SearchItemYourSection"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"
import SortingBySection from "./SortingBySection/SortingBySection"

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

  const { lightBackground, ratingYellow } = useMyColors()

  const [sortingBy, setSortingBy] = useState<SortingByTypes>("theirRatingDesc")

  const sortedItems = useMemo(() => {
    if (!items) return []
    if (sortingBy === "theirInterestDesc")
      return items.sort((a, b) => {
        const interestA = a.interests?.[0]?.interestLevel
        const interestB = b.interests?.[0]?.interestLevel
        if (interestB && !interestA) return 1
        if (!interestA || !interestB) return -1
        if (interestB > interestA) return 1
        return -1
      })

    return items.sort((a, b) => {
      const ratingA = a.ratings?.[0]?.ratingValue
      const ratingB = b.ratings?.[0]?.ratingValue
      if (ratingB && !ratingA) return 1
      if (!ratingA || !ratingB) return -1
      if (ratingB > ratingA) return 1
      return -1
    })
  }, [items, sortingBy])

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(() => authUser?.id === route.params.userId, [
    authUser,
    route.params.userId,
  ])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        {isLoading && <Text>"Loading... "</Text>}

        <VStack paddingX={2} marginTop={4} paddingBottom={10}>
          <HStackVCenter flex={1} justifyContent={"space-between"}>
            <Text fontSize="lg">{items?.length} items</Text>
            <SortingBySection
              onChangeSortingBy={setSortingBy}
              sortingBy={sortingBy}
            />
          </HStackVCenter>

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
                      {item.title} {item.year && `(${item.year})`}
                    </Text>

                    <HStack mt={2}>
                      {!thisIsYourList && (
                        <VStack style={{ width: 120 }}>
                          <>
                            <Text fontWeight="semibold">Them</Text>

                            <HStack space={1}>
                              <VStackHCenter style={{ width: 24 }}>
                                <MaterialCommunityIcons
                                  name="star"
                                  color={
                                    item.ratings?.[0]?.ratingValue
                                      ? ratingYellow
                                      : theme.colors.gray[500]
                                  }
                                  size={18}
                                  style={{ position: "relative", top: 2 }}
                                />
                              </VStackHCenter>
                              {item.ratings?.[0]?.ratingValue ? (
                                <Text>
                                  {item.ratings?.[0]?.ratingValue || ""}
                                </Text>
                              ) : (
                                <Text>?</Text>
                              )}
                            </HStack>
                            <HStack space={1}>
                              <VStackHCenter style={{ width: 24 }}>
                                <FontAwesome5
                                  name={"fire"}
                                  color={
                                    item.interests?.[0]?.interestLevel
                                      ? ratingYellow
                                      : theme.colors.gray[500]
                                  }
                                  size={18}
                                />
                              </VStackHCenter>
                              <Text>{item.interests?.[0]?.interestLevel}</Text>
                            </HStack>
                          </>
                        </VStack>
                      )}
                      <VStack>
                        <SearchItemYourSection
                          ratingValue={item.myRating}
                          interestLevel={item.myInterest}
                        />
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
