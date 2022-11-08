import { useFocusEffect } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HStack, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useCallback, useMemo } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import UserProfilePicture from "../../../components/UserProfilePicture/UserProfilePicture"
import { useMyColors } from "../../../hooks/useMyColors"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import { useMySimilarUsersQuery } from "../../../types/domain/me/useMySimilarUsersQuery"

const DiscoverScreen = ({
  navigation,
}: NativeStackScreenProps<DiscoverScreenTypes, "Discover">) => {
  const { lightBackground } = useMyColors()

  const {
    data: ratingSimilarities,
    isLoading,
    refetch,
  } = useMySimilarUsersQuery()

  const theme = useTheme()

  const sortedRatingSimilarities = useMemo(() => {
    if (!ratingSimilarities) return []
    return ratingSimilarities.sort((a, b) => {
      if (b.overallPercentage > a.overallPercentage) return 1
      return -1
    })
  }, [ratingSimilarities])

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView onRefresh={refetch} refreshing={isLoading}>
        <VStack mt={4} space={4} px={4}>
          {sortedRatingSimilarities.map((item) => (
            <Pressable
              onPress={() =>
                navigation.navigate("Profile", {
                  userId: item.userB.id,
                })
              }
              key={item.userB.id}
            >
              <HStack flexShrink={1}>
                <UserProfilePicture userId={item.userB.id} widthHeigth={36} />

                <VStack ml={4}>
                  <Text fontWeight="semibold">{item.userB.username}</Text>
                  <Text>
                    {Math.floor(item.ratingsSimilarityAvgPercentage * 100)}%
                    rating similarity · {item.ratedSameItemsCount}{" "}
                    {item.ratedSameItemsCount <= 1 ? "item" : "items"}
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </MyScrollView>
    </VStack>
  )
}

export default DiscoverScreen
