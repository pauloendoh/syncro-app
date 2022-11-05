import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { ScrollView } from "react-native"
import { useCustomPositionsQuery } from "../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { SortingByTypes } from "../../../types/domain/others/SortingByTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import SortingBySection from "./SortingBySection/SortingBySection"
import UserItem from "./UserItem/UserItem"

const UserItemsScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<ProfileScreenTypes, "UserItems">) => {
  const { itemType, userId } = route.params

  const { data: customPositions } = useCustomPositionsQuery(itemType)

  const { data: items, isLoading } = useUserItemsQuery(userId, itemType)

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

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(() => authUser?.id === route.params.userId, [
    authUser,
    route.params.userId,
  ])

  const [sortingBy, setSortingBy] = useState<SortingByTypes>(
    thisIsYourList ? "theirInterestDesc" : "theirRatingDesc"
  )

  // PE 1/3 - put in another file
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

    if (sortingBy === "customOrdering") {
      return items
        .sort((a, b) => {
          const positionA =
            customPositions?.find((p) => p.imdbItemId === a.id)?.position ||
            Number.POSITIVE_INFINITY
          const positionB =
            customPositions?.find((p) => p.imdbItemId === b.id)?.position ||
            Number.POSITIVE_INFINITY

          if (positionA < positionB) return -1
          return 1
        })
        .filter((i) => i.myInterest === 3)
    }

    return items.sort((a, b) => {
      const ratingA = a.ratings?.[0]?.ratingValue
      const ratingB = b.ratings?.[0]?.ratingValue
      if (ratingB && !ratingA) return 1
      if (!ratingA || !ratingB) return -1
      if (ratingB > ratingA) return 1
      return -1
    })
  }, [items, sortingBy, customPositions])

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
              thisIsYourList={thisIsYourList}
            />
          </HStackVCenter>

          <VStack space={4} marginTop={4}>
            {sortingBy === "customOrdering" && <Text>Min interest: 3</Text>}
            {sortedItems.map((item) => (
              <UserItem
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate("ImdbItem", { imdbId: item.id })
                }
                thisIsYourList={thisIsYourList}
                itemType={itemType}
                isCustomOrdering={sortingBy === "customOrdering"}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default UserItemsScreen
