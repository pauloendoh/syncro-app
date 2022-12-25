import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, theme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import useToggleSaveItemMutation from "../../../../../hooks/react-query/interest/useToggleSaveItemMutation"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRatingModalStore from "../../../../../hooks/zustand/modals/useRatingModalStore"
import {
  buildRatingDto,
  RatingDto,
} from "../../../../../types/domain/rating/RatingDto"
import HStackVCenter from "../../../../_common/flexboxes/HStackVCenter"

interface Props {
  rating: RatingDto
}

const HomeRatingItemButtons = (props: Props) => {
  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myRating = useMemo(
    () =>
      myRatings?.find((r) => r.syncroItemId === props.rating.syncroItemId) ||
      null,
    [myRatings, props.rating.syncroItemId]
  )

  const myInterest = useMemo(
    () =>
      myInterests?.find((r) => r.syncroItemId === props.rating.syncroItemId) ||
      null,
    [myInterests, props.rating.syncroItemId]
  )

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const { openModal: openRatingModal } = useRatingModalStore()

  return (
    <HStackVCenter mt={2} space={8}>
      <Pressable
        onPress={() => {
          openRatingModal(
            myRating ||
              buildRatingDto({ syncroItemId: props.rating.syncroItemId })
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
      <Pressable
        onPress={() => {
          if (props.rating.syncroItemId)
            submitToggleSave(props.rating.syncroItemId)
        }}
      >
        <HStackVCenter space={1}>
          <MaterialCommunityIcons
            name={myInterest ? "bookmark-check" : "bookmark-outline"}
            color={
              myInterest ? theme.colors.secondary[500] : theme.colors.gray[500]
            }
            size={24}
          />

          <Text color={myInterest && theme.colors.secondary[500]}>
            {myInterest && "Saved"}
          </Text>
        </HStackVCenter>
      </Pressable>
    </HStackVCenter>
  )
}

export default HomeRatingItemButtons
