import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { getShortLabelByRatingValue } from "../../../../../components/modals/RatingModal/getLabelByRatingValue"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRatingModalStore from "../../../../../hooks/zustand/modals/useRatingModalStore"
import { buildDefaultRating } from "../../../../../types/domain/rating/RatingDto"
import VStackHCenter from "../../../../_common/flexboxes/VStackHCenter"

interface Props {
  itemId: string
}

const MyRatingButton = (props: Props) => {
  const { data: myRatings } = useMyRatingsQuery()

  const openModal = useRatingModalStore((s) => s.openModal)

  const savedRating = useMemo(
    () =>
      myRatings?.find(
        (r) => r.imdbItemId === props.itemId && r.value && r.value > 0
      ),
    [props.itemId, myRatings]
  )
  const theme = useTheme()

  return (
    <Pressable
      onPress={() =>
        openModal(
          savedRating || buildDefaultRating({ imdbItemId: props.itemId })
        )
      }
    >
      <VStackHCenter alignItems={"center"}>
        <MaterialCommunityIcons
          name={savedRating ? "star" : "star-outline"}
          color={
            savedRating ? theme.colors.secondary[600] : theme.colors.light[100]
          }
          size={32}
        />

        <Text color={savedRating && theme.colors.secondary[600]}>
          {savedRating?.value ? `${savedRating.value}/10` : "Rate this"}
        </Text>

        <Text color={savedRating && theme.colors.secondary[600]}>
          {savedRating?.value && getShortLabelByRatingValue(savedRating.value)}
        </Text>
      </VStackHCenter>
    </Pressable>
  )
}

export default MyRatingButton
