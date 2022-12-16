import { Actionsheet, Box, FlatList, useTheme, View } from "native-base"
import React, { useMemo, useState } from "react"
import { useWindowDimensions } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { useItemsToRecommendQuery } from "../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery"
import useRecommendUserSheetStore from "../../../hooks/zustand/action-sheets/useRecommendUserSheetStore"
import { useSyncroItemTypeMap } from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import ItemToRecommendOption from "./ItemToRecommendOption/ItemToRecommendOption"

interface Props {}

const renderScene = SceneMap({
  first: () => null,
  second: () => null,
  third: () => null,
  forth: () => null,
})

const RecommendUserSheet = (props: Props) => {
  const { isOpen, closeActionSheet, userId } = useRecommendUserSheetStore()
  const theme = useTheme()

  const [routes] = useState([
    { key: "first", title: "TV series" },
    { key: "second", title: "Movies" },
    { key: "third", title: "Games" },
  ])

  const [tabIndex, setTabIndex] = useState(0)
  const layout = useWindowDimensions()

  const itemType = useSyncroItemTypeMap({ tabIndex })

  const { data: itemsToRecommend } = useItemsToRecommendQuery(
    userId!,
    itemType.itemType
  )

  const sortedItemsToRecommend = useMemo(
    () => itemsToRecommend?.sort((a, b) => a.myRating - b.myRating) || [],
    [itemsToRecommend]
  )

  return (
    <Actionsheet isOpen={isOpen} onClose={closeActionSheet}>
      <Actionsheet.Content>
        <Box height={16} mt={4}>
          <TabView
            renderTabBar={(p) => (
              <TabBar
                scrollEnabled
                {...p}
                tabStyle={{ width: 100 }}
                style={{ backgroundColor: "#00000000" }}
                pressColor="#00000000"
                onTabPress={() => {
                  console.log("pressed")
                }}
                indicatorStyle={{
                  backgroundColor: theme.colors.primary[600],
                }}
              />
            )}
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            initialLayout={{ width: layout.width }}
          />
        </Box>

        <FlatList
          style={{ marginTop: 16 }}
          data={sortedItemsToRecommend}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={(props) => (
            <ItemToRecommendOption
              itemToRecommend={props.item}
              userId={userId!}
            />
          )}
        />
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default RecommendUserSheet
