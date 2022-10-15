import { FontAwesome5 } from "@expo/vector-icons"

import { Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { getShortLabelByInterestValue } from "../../../../../components/modals/InterestModal/getLabelByInterestValue"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useInterestModalStore from "../../../../../hooks/zustand/modals/useInterestModalStore"
import { buildDefaultRating } from "../../../../../types/domain/rating/RatingDto"
import VStackHCenter from "../../../../_common/flexboxes/VStackHCenter"

interface Props {
  itemId: string
}

const MyInterestButton = (props: Props) => {
  const { data: myRatings } = useMyRatingsQuery()

  const openModal = useInterestModalStore((s) => s.openModal)

  const savedRating = useMemo(
    () =>
      myRatings?.find(
        (r) =>
          r.imdbItemId === props.itemId &&
          r.interestLevel &&
          r.interestLevel > 0
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
        <FontAwesome5
          name={"fire"}
          color={
            savedRating ? theme.colors.secondary[600] : theme.colors.light[100]
          }
          size={32}
        />

        <Text color={savedRating && theme.colors.secondary[600]}>
          {savedRating?.interestLevel
            ? `${savedRating.interestLevel}/3`
            : "Rate this"}
        </Text>

        {savedRating?.interestLevel && (
          <Text color={theme.colors.secondary[600]}>
            {getShortLabelByInterestValue(savedRating.interestLevel)}
          </Text>
        )}
      </VStackHCenter>
    </Pressable>
  )
}

export default MyInterestButton
