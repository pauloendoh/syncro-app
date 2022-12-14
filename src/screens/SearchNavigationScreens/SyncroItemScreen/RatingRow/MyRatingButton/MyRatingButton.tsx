import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { getShortLabelByRatingValue } from "../../../../../components/modals/RatingModal/getLabelByRatingValue"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRatingModalStore from "../../../../../hooks/zustand/modals/useRatingModalStore"
import { buildRatingDto } from "../../../../../types/domain/rating/RatingDto"
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
        (r) =>
          r.syncroItemId === props.itemId && r.ratingValue && r.ratingValue > 0
      ),
    [props.itemId, myRatings]
  )
  const theme = useTheme()

  return (
    <Pressable
      onPress={() =>
        openModal(savedRating || buildRatingDto({ syncroItemId: props.itemId }))
      }
    >
      <VStackHCenter alignItems={"center"}>
        <MaterialCommunityIcons
          name={savedRating ? "star" : "star-outline"}
          color={
            savedRating ? theme.colors.secondary[500] : theme.colors.light[100]
          }
          size={32}
        />

        <Text color={savedRating && theme.colors.secondary[500]}>
          {savedRating?.ratingValue ? (
            <>
              <Text fontWeight="500" fontSize="md">
                {savedRating.ratingValue}
              </Text>
              /10
            </>
          ) : (
            "Rate this"
          )}
        </Text>

        <Text color={savedRating && theme.colors.secondary[500]}>
          {savedRating?.ratingValue &&
            getShortLabelByRatingValue(savedRating.ratingValue)}
        </Text>
      </VStackHCenter>
    </Pressable>
  )
}

export default MyRatingButton
