import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Box, HStack, Image, Text, useTheme, VStack } from "native-base"
import React from "react"
import { format } from "timeago.js"
import useMalImportResultsModalStore from "../../../../hooks/zustand/modals/useMalImportResultsModalStore"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { RatingImportRequestDto } from "../../../../types/domain/rating-import-request/RatingImportRequestDto"
import { HomeScreenTypes } from "../../../../types/HomeScreenTypes"

interface Props {
  importRequest: RatingImportRequestDto
  showDot: boolean
}

const RatingImportRequestNotificationItem = ({
  importRequest,
  ...props
}: Props) => {
  const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useTheme()

  const { openModal } = useMalImportResultsModalStore()
  // copy of UserSearchItem
  return (
    <HStack justifyContent="space-between" p={4}>
      <HStack flexShrink={1}>
        <Image
          alt="my-anime-list"
          src={
            "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
          }
          width="36px"
          height="36px"
          borderRadius={36}
        />

        <VStack ml={4} pr={10}>
          <Text>
            <Text>
              Your MyAnimeList anime ratings import has finished!{" "}
              <Text
                color={theme.colors.primary[500]}
                onPress={() => openModal(importRequest.id)}
              >
                Show results
              </Text>
            </Text>
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

          <Text fontSize="sm">{format(importRequest.createdAt)}</Text>
        </VStack>
      </HStack>
    </HStack>
  )
}

export default RatingImportRequestNotificationItem
