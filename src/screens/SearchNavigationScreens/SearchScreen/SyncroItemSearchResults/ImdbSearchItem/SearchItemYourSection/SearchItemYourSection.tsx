import { MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { useMyInterestsQuery } from "../../../../../../hooks/react-query/interest/useMyInterestsQuery"
import useToggleSaveItemMutation from "../../../../../../hooks/react-query/interest/useToggleSaveItemMutation"
import { useMyRatingsQuery } from "../../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRatingModalStore from "../../../../../../hooks/zustand/modals/useRatingModalStore"
import { buildRatingDto } from "../../../../../../types/domain/rating/RatingDto"
import HStackVCenter from "../../../../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../../../../_common/flexboxes/VStackHCenter"

interface Props {
  itemId: string
}

const SearchItemYourSection = (props: Props) => {
  const theme = useTheme()

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const { openModal: openRatingModal } = useRatingModalStore()

  const { data: myRatings } = useMyRatingsQuery()

  const { data: myInterests } = useMyInterestsQuery()

  // PE 1/3 - DRY
  const myRating = useMemo(
    () => myRatings?.find((r) => r.syncroItemId === props.itemId) || null,
    [myRatings, props.itemId]
  )

  const myInterest = useMemo(
    () => myInterests?.find((r) => r.syncroItemId === props.itemId) || null,
    [myInterests, props.itemId]
  )

  return (
    <>
      <Text fontWeight="semibold">You</Text>
      <Pressable
        onPress={() => {
          openRatingModal(
            myRating || buildRatingDto({ syncroItemId: props.itemId })
          )
        }}
      >
        <HStackVCenter space={1}>
          <VStackHCenter style={{ width: 24 }}>
            <MaterialCommunityIcons
              name="star"
              color={
                myRating && myRating.ratingValue && myRating.ratingValue > 0
                  ? theme.colors.secondary[500]
                  : theme.colors.gray[500]
              }
              size={18}
            />
          </VStackHCenter>
          <Text>{myRating?.ratingValue || <Text>&nbsp;</Text>}</Text>
        </HStackVCenter>
      </Pressable>
      <Pressable
        onPress={() => {
          submitToggleSave(props.itemId)
        }}
      >
        <HStack space={1}>
          <VStackHCenter style={{ width: 24 }}>
            <MaterialCommunityIcons
              name={myInterest ? "bookmark-check" : "bookmark-outline"}
              color={
                myInterest
                  ? theme.colors.secondary[500]
                  : theme.colors.gray[500]
              }
              size={18}
            />
          </VStackHCenter>

          <Text>{myInterest && "Saved"}</Text>
        </HStack>
      </Pressable>
    </>
  )
}

export default SearchItemYourSection
