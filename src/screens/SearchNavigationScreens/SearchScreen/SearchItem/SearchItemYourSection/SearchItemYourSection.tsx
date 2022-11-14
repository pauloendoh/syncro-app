import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Text, useTheme } from "native-base"
import React from "react"
import { useGetSecondaryColorByInterest } from "../../../../../utils/domain/item/useGetSecondaryColorByInterest"
import { useGetSecondaryColorByRating } from "../../../../../utils/domain/item/useGetSecondaryColorByRating"
import HStackVCenter from "../../../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../../../_common/flexboxes/VStackHCenter"

interface Props {
  ratingValue?: number | null
  interestLevel?: number | null
}

const SearchItemYourSection = (props: Props) => {
  const theme = useTheme()

  const getSecondaryColorByRating = useGetSecondaryColorByRating()
  const getSecondaryColorByInterest = useGetSecondaryColorByInterest()

  return (
    <>
      <Text fontWeight="semibold">You</Text>
      <HStackVCenter space={1}>
        <VStackHCenter style={{ width: 24 }}>
          <MaterialCommunityIcons
            name="star"
            color={getSecondaryColorByRating(
              props.ratingValue && props.ratingValue
            )}
            size={18}
          />
        </VStackHCenter>
        <Text>{props.ratingValue || <Text>&nbsp;</Text>}</Text>
      </HStackVCenter>
      <HStack space={1}>
        <VStackHCenter style={{ width: 24 }}>
          <FontAwesome5
            name={"fire"}
            color={getSecondaryColorByInterest(props.interestLevel)}
            size={18}
          />
        </VStackHCenter>

        <Text>{props.interestLevel || <Text>&nbsp;</Text>}</Text>
      </HStack>
    </>
  )
}

export default SearchItemYourSection
