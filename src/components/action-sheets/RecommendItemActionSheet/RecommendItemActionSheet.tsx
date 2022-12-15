import { Actionsheet, FlatList, View } from "native-base"
import React from "react"
import { useMutualsSavedItemQuery } from "../../../hooks/react-query/user/useMutualsSavedItemQuery"
import useRecommendItemActionSheetStore from "../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import RecommendMutualItem from "./RecommendMutualItem/RecommendMutualItem"

interface Props {}

const RecommendItemActionSheet = (props: Props) => {
  const {
    isOpen,
    closeActionSheet,
    itemId,
  } = useRecommendItemActionSheetStore()
  const { data: mutuals } = useMutualsSavedItemQuery(itemId!)

  return (
    <Actionsheet isOpen={isOpen} onClose={closeActionSheet}>
      <Actionsheet.Content>
        <FlatList
          data={mutuals}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={(props) => (
            <RecommendMutualItem
              {...props}
              mutual={props.item}
              itemId={itemId!}
            />
          )}
        />
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default RecommendItemActionSheet
