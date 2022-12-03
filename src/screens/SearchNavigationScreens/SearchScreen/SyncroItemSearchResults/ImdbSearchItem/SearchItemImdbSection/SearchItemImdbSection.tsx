import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, theme } from "native-base"
import React from "react"
import { shortNumberFormatter } from "../../../../../../utils/math/shortNumberFormatter"
import HStackVCenter from "../../../../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../../../../_common/flexboxes/VStackHCenter"

interface Props {
  avgRating: number
  ratingCount: number
}

const SearchItemImdbSection = (props: Props) => {
  return (
    <>
      <Text fontWeight="semibold">IMDB</Text>

      <HStackVCenter space={1}>
        <VStackHCenter style={{ width: 24 }}>
          <MaterialCommunityIcons name="star" color={"#FFB600"} size={18} />
        </VStackHCenter>
        <Text>{props.avgRating}/10</Text>
      </HStackVCenter>
      <HStackVCenter space={1}>
        <VStackHCenter style={{ width: 24 }}>
          <MaterialCommunityIcons
            name="eye"
            color={theme.colors.dark[900]}
            size={18}
          />
        </VStackHCenter>
        <Text>{shortNumberFormatter(props.ratingCount)} votes</Text>
      </HStackVCenter>
    </>
  )
}

export default SearchItemImdbSection
