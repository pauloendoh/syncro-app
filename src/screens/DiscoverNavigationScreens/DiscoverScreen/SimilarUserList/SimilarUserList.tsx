import { HStack, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import { useMySimilarUsersQuery } from "../../../../types/domain/me/useMySimilarUsersQuery"

interface Props {
  onPressUserId: (userId: string) => void
}

const SimilarUserList = (props: Props) => {
  const theme = useTheme()

  const {
    data: ratingSimilarities,
    isLoading,
    refetch,
  } = useMySimilarUsersQuery()

  const sortedRatingSimilarities = useMemo(
    () =>
      ratingSimilarities?.sort((a, b) => {
        if (b.ratedSameItemsCount > a.ratedSameItemsCount) return 1
        return -1
      }) || [],
    [ratingSimilarities]
  )

  return (
    <VStack space={4}>
      {sortedRatingSimilarities.map((item) => (
        <Pressable
          onPress={() => props.onPressUserId(item.userB.id)}
          key={item.userB.id}
        >
          <HStack flexShrink={1}>
            <UserProfilePicture userId={item.userB.id} widthHeigth={36} />

            <VStack ml={4}>
              <Text fontWeight="semibold">{item.userB.username}</Text>
              <Text>
                {item.ratedSameItemsCount}{" "}
                {item.ratedSameItemsCount <= 1 ? "item" : "items"} ·{" "}
                {Math.floor(item.ratingsSimilarityAvgPercentage * 100)}% rating
                similarity
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      ))}
    </VStack>
  )
}

export default SimilarUserList
