import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, useTheme } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useMyRatingQU } from "../../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRatingModalStore from "../../../../../../hooks/zustand/modals/useRatingModalStore"
import { buildRatingDto } from "../../../../../../types/domain/rating/RatingDto"
import HStackVCenter from "../../../../../_common/flexboxes/HStackVCenter"

interface Props {
  itemId: string
}

const PressableMyRating = (props: Props) => {
  const { openModal: openRatingModal } = useRatingModalStore()
  const myRating = useMyRatingQU(props.itemId)

  const theme = useTheme()

  return (
    <Pressable
      onPress={() => {
        openRatingModal(
          myRating || buildRatingDto({ syncroItemId: props.itemId })
        )
      }}
    >
      <HStackVCenter space={1}>
        <MaterialCommunityIcons
          name="star"
          color={
            myRating && myRating.ratingValue && myRating.ratingValue > 0
              ? theme.colors.secondary[500]
              : theme.colors.gray[500]
          }
          size={24}
        />
        <Text color={myRating && theme.colors.secondary[500]}>
          {myRating?.ratingValue || <Text>&nbsp;</Text>}
        </Text>
      </HStackVCenter>
    </Pressable>
  )
}

export default PressableMyRating
