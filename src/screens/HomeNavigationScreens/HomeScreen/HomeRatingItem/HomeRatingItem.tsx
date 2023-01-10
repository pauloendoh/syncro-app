import { DateTime } from "luxon"
import { Box, HStack, Pressable, Text, useTheme, VStack } from "native-base"
import React, { useMemo } from "react"
import MyFastImage from "../../../../components/MyFastImage/MyFastImage"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { RatingDto } from "../../../../types/domain/rating/RatingDto"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
import HomeRatingItemButtons from "./HomeRatingItemButtons/HomeRatingItemButtons"

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
              {rating.syncroItem?.title}{" "}
              {rating.syncroItem?.year && `(${rating.syncroItem?.year})`}
            </Text>
            <Text fontSize="xs">{timeAgo}</Text>

            <HomeRatingItemButtons rating={rating} />
          </VStack>
        </HStack>
        <Box width={100} position="relative">
          <MyFastImage
            src={getImageUrlOrDefaultUrl(rating.syncroItem?.imageUrl)}
            width={100}
            height={100}
            alt={rating.syncroItem?.title}
          />

          {/* {rating.syncroItem && rating.syncroItem.avgRating > 0 && (
            <HStackVCenter
              position="absolute"
              justifyContent={"space-between"}
              py={0.5}
              px={2}
              space={1}
              style={{
                backgroundColor: theme.colors.black,
                right: 0,
                bottom: 0,
                opacity: 0.75,
              }}
            >
              <SyncroItemIcon type={rating.syncroItem.type} size={12} />
              <Text color="yellow.500" fontWeight="semibold" fontSize={"xs"}>
                {rating.syncroItem?.avgRating || ""}
              </Text>
            </HStackVCenter>
          )} */}
        </Box>
      </HStack>
    </Pressable>
  )
}

export default HomeRatingItem
