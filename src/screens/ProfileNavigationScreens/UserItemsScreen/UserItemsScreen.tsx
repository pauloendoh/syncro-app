import { useFocusEffect } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { useCustomPositionsQuery } from "../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserInfoQuery } from "../../../hooks/react-query/user/useUserInfoQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { SortingByTypes } from "../../../types/domain/others/SortingByTypes"
import { syncroItemMapping } from "../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import SortingBySection from "./SortingBySection/SortingBySection"
import UserItemsList from "./UserItemsList/UserItemsList"
import { useSortedItems } from "./useSortedItems/useSortedItems"

const UserItemsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<ProfileScreenTypes, "UserItems">) => {
  const { itemType, userId } = route.params

  const { data: customPositions } = useCustomPositionsQuery(itemType)

  const { data: items, isLoading, refetch } = useUserItemsQuery(
    userId,
    itemType
  )

  const { data: userInfo } = useUserInfoQuery(route.params.userId)

  const headerTitle = useMemo(() => {
    if (!userInfo?.username) return "User items"

    return `${userInfo.username} - ${syncroItemMapping[itemType].labelPlural}`
  }, [userInfo, route.params.itemType])

  useEffect(
    () =>
      navigation.setOptions({
        headerTitle,
      }),
    [headerTitle]
  )

  useFocusEffect(() => {
    refetch()
  })

  const { lightBackground } = useMyColors()

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsYourList = useMemo(() => authUser?.id === route.params.userId, [
    authUser,
    route.params.userId,
  ])

  const [sortingBy, setSortingBy] = useState<SortingByTypes>(
    thisIsYourList ? "theirInterestDesc" : "theirRatingDesc"
  )

  const sortedItems = useSortedItems({ items, sortingBy, customPositions })

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <VStack paddingX={4} marginTop={4} style={{ flex: 1 }}>
        <HStackVCenter justifyContent={"space-between"}>
          <Text fontSize="lg">{items?.length} items</Text>
          <SortingBySection
            onChangeSortingBy={setSortingBy}
            sortingBy={sortingBy}
            thisIsYourList={thisIsYourList}
          />
        </HStackVCenter>

        <UserItemsList
          isLoading={isLoading}
          itemType={itemType}
          onPressItem={(id) => navigation.push("SyncroItem", { itemId: id })}
          sortedItems={sortedItems}
          sortingBy={sortingBy}
          thisIsYourList={thisIsYourList}
        />
      </VStack>
    </VStack>
  )
}

export default UserItemsScreen
