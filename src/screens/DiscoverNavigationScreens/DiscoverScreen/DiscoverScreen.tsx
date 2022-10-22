import { FontAwesome } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HStack, Pressable, Spinner, Text, useTheme, VStack } from "native-base"
import React, { useCallback, useMemo } from "react"
import { ScrollView } from "react-native"
import { useMyColors } from "../../../hooks/useMyColors"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import { useMySimilarUsersQuery } from "../../../types/domain/me/useMySimilarUsersQuery"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"

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
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {isLoading && (
          <VStackHCenter mt={4}>
            <Spinner size={"lg"} color="primary.500" />
          </VStackHCenter>
        )}

        <VStack mt={4} space={4}>
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
                <FontAwesome
                  name="user-circle-o"
                  size={36}
                  color={theme.colors.dark[900]}
                />
                <VStack ml={4}>
                  <Text fontWeight="semibold">@{item.userB.username}</Text>
                  <Text>
                    {Math.floor(item.ratingsSimilarityAvgPercentage * 100)}%
                    similarity · {item.ratedSameItemsCount} items
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default DiscoverScreen