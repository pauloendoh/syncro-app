import { Text } from "native-base"
import React from "react"
import useImportRatingsModalStore from "../../../../hooks/zustand/modals/useImportRatingsModalStore"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"

interface Props {
  tabIndex: number
}

const SearchScreenImportSection = (props: Props) => {
  const openModal = useImportRatingsModalStore((s) => s.openModal)
  return (
    <VStackHCenter mt={8}>
      <Text>
        Import anime ratings via{" "}
        <Text onPress={() => openModal("MyAnimeList")} color="primary.500">
          MyAnimeList
        </Text>
      </Text>
    </VStackHCenter>
  )
}

export default SearchScreenImportSection
