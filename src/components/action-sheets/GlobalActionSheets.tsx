import React from "react"
import useRecommendItemActionSheetStore from "../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import RecommendItemActionSheet from "./RecommendItemActionSheet"

interface Props {
  test?: string
}

const GlobalActionSheets = (props: Props) => {
  const itemId = useRecommendItemActionSheetStore((s) => s.itemId)

  return <>{itemId && <RecommendItemActionSheet />}</>
}

export default GlobalActionSheets
