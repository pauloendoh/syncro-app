import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base"
import React from "react"
import { format } from "timeago.js"
import UserProfilePicture from "../../../../components/UserProfilePicture/UserProfilePicture"
import { ItemRecommendationDto } from "../../../../hooks/react-query/notification/types/ItemRecommendationDto"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { HomeScreenTypes } from "../../../../types/HomeScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
interface Props {
  itemRecommendation: ItemRecommendationDto
  showDot: boolean
}

const ItemRecommendationNotificationItem = ({
  itemRecommendation: itemRecommendation,
  ...props
}: Props) => {
  const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useTheme()

  // copy of UserSearchItem
  return (
    <Pressable
      onPress={() => push("ImdbItem", { imdbId: itemRecommendation.item.id })}
    >
      <HStack justifyContent="space-between" p={4}>
        <HStack>
          <UserProfilePicture
            userId={itemRecommendation.user.id}
            widthHeigth={36}
          />

          <VStack ml={4}>
            <Text maxWidth={200}>
              <Text fontWeight={"semibold"}>
                {itemRecommendation.user.username}
              </Text>{" "}
              recommended you:
              {props.showDot && (
                <Box>
                  <Box
                    style={{
                      backgroundColor: theme.colors.primary[500],
                      minWidth: 8,
                      minHeight: 8,
                      borderRadius: 8,
                      marginLeft: 8,
                    }}
                  />
                </Box>
              )}
            </Text>
            <Text style={{ fontWeight: "500" }} noOfLines={1}>
              {itemRecommendation.item.title}{" "}
              {itemRecommendation.item.year &&
                `(${itemRecommendation.item.year})`}
            </Text>

            <Text fontSize="sm">{format(itemRecommendation.createdAt)}</Text>
          </VStack>
        </HStack>
        <Image
          src={getImageUrlOrDefaultUrl(itemRecommendation.item.imageUrl)}
          width="100px"
          height="100px"
          alt={itemRecommendation.item.title}
        />
      </HStack>
    </Pressable>
  )
}

export default ItemRecommendationNotificationItem
