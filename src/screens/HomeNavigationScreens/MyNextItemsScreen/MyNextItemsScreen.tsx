import AsyncStorage from "@react-native-async-storage/async-storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, Select, Text, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { useCustomPositionsQuery } from "../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserItemsQuery } from "../../../hooks/react-query/user/useUserItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { SyncroItemType } from "../../../types/domain/SyncroItemType"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { asyncStorageKeys } from "../../../utils/asyncStorageKeys"
import UserItemsList from "../../ProfileNavigationScreens/UserItemsScreen/UserItemsList/UserItemsList"
import { useSortedItems } from "../../ProfileNavigationScreens/UserItemsScreen/useSortedItems/useSortedItems"
import { selectItemTypes } from "./utils/selectItemTypes"

const MyNextItemsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "MyNextItems">) => {
  const { lightBackground } = useMyColors()

  const [selectedItemType, setSelectedItemType] = useState<SyncroItemType>(
    "tv series"
  )

  useEffect(() => {
    AsyncStorage.getItem(asyncStorageKeys.myNextItemsScreenInitialValue).then(
      (value) => {
        if (value) setSelectedItemType(value as SyncroItemType)
      }
    )
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(
      asyncStorageKeys.myNextItemsScreenInitialValue,
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
        {selectItemTypes.map((item) => (
          <Select.Item key={item.key} label={item.label} value={item.key} />
        ))}
      </Select>

      {sortedItems.length === 0 ? (
        <Box mt={4}>
          <Text>No items were found :( </Text>
          <Box mt={2} />
          <Text>Start saving as "Very interested!"</Text>
        </Box>
      ) : (
        <UserItemsList
          isLoading={isLoading}
          itemType={selectedItemType}
          onPressItem={(id) => navigation.push("ImdbItem", { imdbId: id })}
          sortedItems={sortedItems}
          sortingBy={"customOrdering"}
          thisIsYourList={true}
        />
      )}
    </VStack>
  )
}

export default MyNextItemsScreen
