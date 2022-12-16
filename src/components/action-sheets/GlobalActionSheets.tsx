import React from "react"
import useRecommendItemActionSheetStore from "../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import RecommendUserSheet from "./RecommendItemActionSheet copy/RecommendUserSheet"
import RecommendItemActionSheet from "./RecommendItemActionSheet/RecommendItemActionSheet"

interface Props {
  test?: string
}

const GlobalActionSheets = (props: Props) => {
  const itemId = useRecommendItemActionSheetStore((s) => s.itemId)

  return (
    <>
      {itemId && <RecommendItemActionSheet />}
      <RecommendUserSheet />
    </>
  )
}

export default GlobalActionSheets
