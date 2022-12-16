import { Button } from "native-base"
import React from "react"
import useRecommendUserSheetStore from "../../../../../hooks/zustand/action-sheets/useRecommendUserSheetStore"

interface Props {
  userId: string
}

const RecommendUserButton = (props: Props) => {
  const { openActionSheet } = useRecommendUserSheetStore()
  return (
    <Button
      flex={1}
      colorScheme="gray"
      onPress={() => openActionSheet(props.userId)}
    >
      Recommend
    </Button>
  )
}

export default RecommendUserButton
