import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { Box, Image, Pressable, Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { useMyInterestsQuery } from "../../../hooks/react-query/interest/useMyInterestsQuery"
import { useMyRatingsQuery } from "../../../hooks/react-query/rating/useMyRatingsQuery"
import useInterestModalStore from "../../../hooks/zustand/modals/useInterestModalStore"
import useRatingModalStore from "../../../hooks/zustand/modals/useRatingModalStore"
import { buildInterestDto } from "../../../types/domain/interest/InterestDto"
import { buildRatingDto } from "../../../types/domain/rating/RatingDto"
import { SyncroItemDto } from "../../../types/domain/syncro-item/SyncroItemDto"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"
import HStackVCenter from "../flexboxes/HStackVCenter"

interface Props {
  syncroItem?: SyncroItemDto
}

const SyncroItemImage = (props: Props) => {
  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const { openModal: openRatingModal } = useRatingModalStore()

  const myRating = useMemo(
    () => myRatings?.find((r) => r.syncroItemId === props.syncroItem?.id),
    [myRatings, props.syncroItem?.id]
  )

  const { openModal: openInterestModal } = useInterestModalStore()

  const myInterest = useMemo(
    () => myInterests?.find((r) => r.syncroItemId === props.syncroItem?.id),
    [myInterests, props.syncroItem?.id]
  )

  const theme = useTheme()

  return (
    <Box>
      <Image
        src={getImageUrlOrDefaultUrl(props.syncroItem?.imageUrl)}
        width={100}
        height={100}
        alt={props.syncroItem?.title}
      />

      <HStackVCenter>
        <Pressable
          onPress={() =>
            openRatingModal(
              myRating || buildRatingDto({ syncroItemId: props.syncroItem?.id })
            )
          }
        >
          <HStackVCenter
            backgroundColor="gray.800"
            width="51px"
            py={0.5}
            justifyContent="center"
            space={1}
          >
            <MaterialCommunityIcons
              name={myRating ? "star" : "star-outline"}
              color={
                myRating ? theme.colors.secondary[500] : theme.colors.light[100]
              }
              size={14}
            />

            <Text>{myRating?.ratingValue}</Text>
          </HStackVCenter>
        </Pressable>
        <Pressable
          onPress={() =>
            openInterestModal(
              myInterest ||
                buildInterestDto({ syncroItemId: props.syncroItem?.id })
            )
          }
        >
          <HStackVCenter
            backgroundColor="gray.800"
            width="50px"
            py={0.5}
            justifyContent="center"
            space={1}
          >
            <FontAwesome5
              name={myInterest ? "fire" : "fire"}
              color={
                myInterest
                  ? theme.colors.secondary[500]
                  : theme.colors.light[100]
              }
              size={13}
            />

            <Text>{myInterest?.interestLevel}</Text>
          </HStackVCenter>
        </Pressable>
      </HStackVCenter>
    </Box>
  )
}

export default SyncroItemImage
