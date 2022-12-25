import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text, theme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import useToggleSaveItemMutation from "../../../../../hooks/react-query/interest/useToggleSaveItemMutation"
import { useMyRatingsQuery } from "../../../../../hooks/react-query/rating/useMyRatingsQuery"
import { RatingDto } from "../../../../../types/domain/rating/RatingDto"
import HStackVCenter from "../../../../_common/flexboxes/HStackVCenter"
import PressableMyRating from "./PressableMyRating/PressableMyRating"

interface Props {
  rating: RatingDto
}

const HomeRatingItemButtons = (props: Props) => {
  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const myInterest = useMemo(
    () =>
      myInterests?.find((r) => r.syncroItemId === props.rating.syncroItemId) ||
      null,
    [myInterests, props.rating.syncroItemId]
  )

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  return (
    <HStackVCenter mt={2} space={8}>
      <PressableMyRating itemId={props.rating.syncroItemId!} />
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
