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

  const sortedRatingSimilarities = useMemo(() => {
    if (!ratingSimilarities) return []
    return ratingSimilarities.sort((a, b) => {
      if (b.overallPercentage > a.overallPercentage) return 1
      return -1
    })
  }, [ratingSimilarities])

  return (
    <>
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
                {Math.floor(item.ratingsSimilarityAvgPercentage * 100)}% rating
                similarity · {item.ratedSameItemsCount}{" "}
                {item.ratedSameItemsCount <= 1 ? "item" : "items"}
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      ))}
    </>
  )
}

export default SimilarUserList
