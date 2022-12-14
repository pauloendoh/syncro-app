import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList } from "native-base"
import { useEffect, useMemo } from "react"
import { useSavedItemsQuery } from "../../../hooks/react-query/interest/useSavedItemsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { syncroItemTypes } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import SavedItemsByTypeSection from "./SavedItemsByTypeSection/SavedItemsByTypeSection"

// PE 1/3 - rename to SavedItemsScreen
const MyNextItemsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "MyNextItems">) => {
  const { lightBackground } = useMyColors()

  const { data: savedItems } = useSavedItemsQuery()

  const groupedSavedItems = useMemo(() => {
    if (!savedItems) return []

    return syncroItemTypes
      .map((t) => ({
        type: t,
        items: savedItems.filter((i) => i.syncroItem?.type === t),
      }))
      .sort(
        // sort by number of items descending
        (a, b) => (a.items.length > b.items.length ? -1 : 1)
      )
  }, [savedItems])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${savedItems?.length || 0} Saved Items`,
    })
  }, [savedItems])

  return (
    <FlatList
      flex="1"
      backgroundColor={lightBackground}
      paddingX={4}
      paddingTop={4}
      data={groupedSavedItems}
      renderItem={({ index, item, separators }) => (
        <SavedItemsByTypeSection itemType={item.type} savedItems={item.items} />
      )}
    />
  )

  // return (
  //   <VStack
  //     flex="1"
  //     backgroundColor={lightBackground}
  //     paddingX={4}
  //     paddingTop={4}
  //   >
  //     {syncroItemTypes.map((itemType) => (
  //       <SavedItemsByTypeSection itemType={itemType} key={itemType} />
  //     ))}
  //   </VStack>
  // )
}

export default MyNextItemsScreen
