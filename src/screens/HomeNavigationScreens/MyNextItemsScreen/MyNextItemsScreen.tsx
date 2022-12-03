import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useQueryClient } from "@tanstack/react-query"
import { Box, Select, Text, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { useCustomPositionsQuery } from "../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { syncroItemMapping } from "../../../types/domain/syncro-item/SyncroItemType/syncroItemMapping"
import {
  SyncroItemType,
  syncroItemTypes,
} from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { storageKeys } from "../../../utils/storageKeys"
import { urls } from "../../../utils/urls"
import UserItemsList from "../../ProfileNavigationScreens/UserItemsScreen/UserItemsList/UserItemsList"
import { useSortedItems } from "../../ProfileNavigationScreens/UserItemsScreen/useSortedItems/useSortedItems"

const MyNextItemsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "MyNextItems">) => {
  const { lightBackground } = useMyColors()

  const [selectedItemType, setSelectedItemType] = useState<SyncroItemType>(
    "tv series"
  )

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.myNextItemsScreenInitialValue).then(
      (value) => {
        if (value) setSelectedItemType(value as SyncroItemType)
      }
    )
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(
      storageKeys.myNextItemsScreenInitialValue,
      selectedItemType
    )
  }, [selectedItemType])

  const authUser = useAuthStore((s) => s.authUser)
  const { data: items, isLoading, refetch } = useUserItemsQuery(
    authUser!.id,
    selectedItemType
  )

  const { data: customPositions } = useCustomPositionsQuery(selectedItemType)

  const sortedItems = useSortedItems({
    items,
    sortingBy: "customOrdering",
    customPositions,
  })

  const qc = useQueryClient()

  useFocusEffect(() => {
    qc.invalidateQueries([urls.api.userItems(authUser!.id, selectedItemType)])
    qc.invalidateQueries([urls.api.customPosition])
  })

  return (
    <VStack
      flex="1"
      backgroundColor={lightBackground}
      paddingX={4}
      paddingTop={4}
    >
      <Select
        selectedValue={selectedItemType}
        onValueChange={(value) => setSelectedItemType(value as SyncroItemType)}
      >
        {syncroItemTypes.map((type) => (
          <Select.Item
            key={type}
            label={syncroItemMapping[type].labelPlural}
            value={type}
          />
        ))}
      </Select>

      {sortedItems.length === 0 && !isLoading ? (
        <Box mt={4}>
          <Text>No items were found :( </Text>
          <Box mt={2} />
          <Text>Start saving as "Very interested!"</Text>
        </Box>
      ) : (
        <UserItemsList
          isLoading={isLoading}
          itemType={selectedItemType}
          onPressItem={(id) => navigation.push("SyncroItem", { itemId: id })}
          sortedItems={sortedItems}
          sortingBy={"customOrdering"}
          thisIsYourList={true}
        />
      )}
    </VStack>
  )
}

export default MyNextItemsScreen
