import { DateTime } from "luxon"
import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { RatingDto } from "../../../../types/domain/rating/RatingDto"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"

interface Props {
  rating: RatingDto
  onPress: () => void
}

const HomeRatingItem = ({ rating, ...props }: Props) => {
  const theme = useTheme()

  const timeAgo = useMemo(() => {
    return DateTime.fromISO(rating.createdAt).toRelative()
  }, [rating.createdAt])

  const authUser = useAuthStore((s) => s.authUser)
  return (
    <Pressable onPress={() => props.onPress()}>
      <HStack key={rating.id} justifyContent="space-between">
        <HStack flexShrink={1}>
          <UserProfilePicture userId={rating.userId} widthHeigth={40} />

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
            <Text>
              <Text>{rating.imdbItem?.title}</Text>{" "}
              {rating.imdbItem?.year && `(${rating.imdbItem?.year})`}
            </Text>
            <Text fontSize="xs">{timeAgo}</Text>
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
