import { Text, VStack } from "native-base"
import React from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { SortingByTypes } from "../../../../types/domain/others/SortingByTypes"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { UserItemDto } from "../../../../types/domain/syncro-item/UserItemDto"
import UserItem from "../UserItem/UserItem"

interface Props {
  sortingBy: SortingByTypes
  isLoading: boolean
  sortedItems: UserItemDto[]
  onPressItem: (itemId: string) => void
  thisIsYourList: boolean
  itemType: SyncroItemType
  onRefresh: () => void
}

const UserItemsList = ({
  sortingBy,
  isLoading,
  sortedItems,
  ...props
}: Props) => {
  return (
    <VStack space={4} marginTop={4} style={{ flex: 1 }}>
      {sortingBy === "customOrdering" && <Text>Min interest: 3</Text>}
      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={props.onRefresh}
            />
          }
          data={sortedItems}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={(itemProps) => (
            <UserItem
              {...itemProps}
              item={itemProps.item}
              onPress={() => props.onPressItem(itemProps.item.id)}
              thisIsYourList={props.thisIsYourList}
              itemType={props.itemType}
              isCustomOrdering={sortingBy === "customOrdering"}
            />
          )}
        />
      </View>
    </VStack>
  )
}

export default UserItemsList
