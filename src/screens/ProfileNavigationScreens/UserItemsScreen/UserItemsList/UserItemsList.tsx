import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Text, VStack } from "native-base"
import React from "react"
import { FlatList, View } from "react-native"
import { SortingByTypes } from "../../../../types/domain/others/SortingByTypes"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { UserItemDto } from "../../../../types/domain/syncro-item/UserItemDto"
import { ProfileScreenTypes } from "../../../../types/ProfileScreenTypes"
import UserItem from "../UserItem/UserItem"

interface Props {
  sortingBy: SortingByTypes
  isLoading: boolean
  sortedItems: UserItemDto[]
  onPressItem: (itemId: string) => void
  thisIsYourList: boolean
  itemType: SyncroItemType
}

const UserItemsList = ({
  sortingBy,
  isLoading,
  sortedItems,
  ...props
}: Props) => {
  const navigation = useNavigation<
    NativeStackScreenProps<ProfileScreenTypes, "UserItems">
  >()
  return (
    <VStack space={4} marginTop={4} style={{ flex: 1 }}>
      {sortingBy === "customOrdering" && <Text>Min interest: 3</Text>}
      <View style={{ flex: 1 }}>
        <FlatList
          refreshing={isLoading}
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
