import { FontAwesome } from "@expo/vector-icons"
import { DateTime } from "luxon"
import { HStack, Image, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import { RatingDto } from "../../../types/domain/rating/RatingDto"

interface Props {
  rating: RatingDto
}

const HomeRatingItem = ({ rating }: Props) => {
  const theme = useTheme()

  const timeAgo = useMemo(() => {
    return DateTime.fromISO(rating.createdAt).toRelative()
  }, [rating.createdAt])
  return (
    <HStack key={rating.id} justifyContent="space-between">
      <HStack>
        <FontAwesome
          name="user-circle-o"
          size={36}
          color={theme.colors.dark[900]}
        />
        <VStack ml={4}>
          <Text>
            {rating.user?.username} rated {rating.ratingValue}/10
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
  )
}

export default HomeRatingItem
