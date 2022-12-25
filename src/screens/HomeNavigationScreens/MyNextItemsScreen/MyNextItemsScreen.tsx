import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView } from "native-base"
import React from "react"
import { useMyColors } from "../../../hooks/useMyColors"
import { syncroItemTypes } from "../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import SavedItemsByTypeSection from "./SavedItemsByTypeSection/SavedItemsByTypeSection"

const MyNextItemsScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "MyNextItems">) => {
  const { lightBackground } = useMyColors()

  return (
    <ScrollView
      flex="1"
      backgroundColor={lightBackground}
      paddingX={4}
      paddingTop={4}
    >
      {syncroItemTypes.map((itemType) => (
        <SavedItemsByTypeSection itemType={itemType} key={itemType} />
      ))}
    </ScrollView>
  )
}

export default MyNextItemsScreen
