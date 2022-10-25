import { FontAwesome } from "@expo/vector-icons"
import { DateTime } from "luxon"
import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { RatingDto } from "../../../../types/domain/rating/RatingDto"

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
          <FontAwesome
            name="user-circle-o"
            size={36}
            color={theme.colors.dark[900]}
          />
          <VStack ml={4} flexShrink={1} pr={2}>
            <Text>
              {authUser?.username === rating.user?.username
                ? "You"
                : rating.user?.username}{" "}
              rated {rating.ratingValue}/10
            </Text>
            <Text>
              <Text fontWeight="semibold">{rating.imdbItem?.title}</Text>{" "}
              {rating.imdbItem?.year && `(${rating.imdbItem?.year})`}
            </Text>
            <Text fontSize="xs">{timeAgo}</Text>
          </VStack>
        </HStack>
        <HStack width={100}>
          <Image
            src={rating.imdbItem?.imageUrl}
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
