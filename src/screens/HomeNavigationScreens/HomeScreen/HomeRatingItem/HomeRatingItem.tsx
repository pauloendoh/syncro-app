import { MaterialCommunityIcons } from "@expo/vector-icons"
import { DateTime } from "luxon"
import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import { useMyInterestsQuery } from "../../../../hooks/react-query/interest/useMyInterestsQuery"
import { useMyRatingsQuery } from "../../../../hooks/react-query/rating/useMyRatingsQuery"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { RatingDto } from "../../../../types/domain/rating/RatingDto"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"

interface Props {
  rating: RatingDto
  onPress: () => void
  onPressUser: () => void
}

const HomeRatingItem = ({ rating, ...props }: Props) => {
  const theme = useTheme()

  const timeAgo = useMemo(() => {
    return DateTime.fromISO(rating.createdAt).toRelative()
  }, [rating.createdAt])

  const authUser = useAuthStore((s) => s.authUser)

  const { data: myRatings } = useMyRatingsQuery()
  const { data: myInterests } = useMyInterestsQuery()

  const itemIsInMyList = useMemo(() => {
    const rated =
      myRatings?.find((r) => r.imdbItemId === rating.imdbItemId) || null
    const interested =
      myInterests?.find((r) => r.imdbItemId === rating.imdbItemId) || null
    return Boolean(rated || interested)
  }, [myRatings, myInterests, rating.imdbItemId])

  return (
    <Pressable onPress={() => props.onPress()}>
      <HStack key={rating.id} justifyContent="space-between">
        <HStack flexShrink={1}>
          <UserProfilePicture
            onPress={props.onPressUser}
            userId={rating.userId}
            widthHeigth={40}
          />

          <VStack ml={4} flexShrink={1} pr={2}>
            <Text>
              <Text fontWeight={"semibold"}>
                {authUser?.username === rating.user?.username
                  ? "You"
                  : rating.user?.username}{" "}
              </Text>
              rated{" "}
              <Text fontWeight={"semibold"} color="yellow.500">
                {rating.ratingValue}
              </Text>
            </Text>
            <Text numberOfLines={1}>
              {rating.imdbItem?.title}{" "}
              {rating.imdbItem?.year && `(${rating.imdbItem?.year})`}
            </Text>
            <Text fontSize="xs">{timeAgo}</Text>

            <HStackVCenter mt={1}>
              {itemIsInMyList && (
                <HStackVCenter space={1}>
                  <MaterialCommunityIcons
                    name="bookmark-box-multiple"
                    size={16}
                    color={theme.colors.secondary[500]}
                  />
                  <Text style={{ color: theme.colors.secondary[500] }}>
                    Saved
                  </Text>
                </HStackVCenter>
              )}
            </HStackVCenter>
          </VStack>
        </HStack>
        <HStack width={100}>
          <Image
            src={getImageUrlOrDefaultUrl(rating.imdbItem?.imageUrl)}
            width={100}
            height={100}
            alt={rating.imdbItem?.title}
          />
        </HStack>
      </HStack>
    </Pressable>
  )
}

export default HomeRatingItem
