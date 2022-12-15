import { Actionsheet, Button, HStack, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import useRecommendItemMutation from "../../../../hooks/react-query/imdb-item/useRecommendItemMutation"
import { useItemsRecommendationsFromMeQuery } from "../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery"
import { MutualSavedItemDto } from "../../../../hooks/react-query/user/useMutualsSavedItemQuery"
import useRecommendItemActionSheetStore from "../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import HStackVCenter from "../../../../screens/_common/flexboxes/HStackVCenter"
import UserProfilePicture from "../../../UserProfilePicture/UserProfilePicture"

interface Props {
  mutual: MutualSavedItemDto
  itemId: string
}

const RecommendMutualItem = ({ mutual, itemId }: Props) => {
  const { mutate: submitRecommendItem, isLoading } = useRecommendItemMutation()

  const { data: itemsRecommended } = useItemsRecommendationsFromMeQuery()
  const { closeActionSheet } = useRecommendItemActionSheetStore()

  const isAlreadyRecommended = useMemo(() => {
    if (!itemsRecommended) return false
    return !!itemsRecommended.find(
      (r) => r.toUserId === mutual.user.id && r.itemId === itemId
    )
  }, [itemsRecommended])

  const isDisabled = useMemo(() => {
    if (isAlreadyRecommended || mutual.isSaved) return true
    return false
  }, [isAlreadyRecommended, mutual.isSaved])

  const buttonLabel = useMemo(() => {
    if (isAlreadyRecommended) return "Recommended"
    if (mutual.isSaved) return "Already saved."
    return "Recommend"
  }, [isAlreadyRecommended, mutual.isSaved])

  return (
    <Actionsheet.Item
      key={mutual.user.id}
      disabled={isDisabled}
      pr={6}
      width="100%"
      _pressed={{
        background: "unset",
      }}
    >
      <HStack justifyContent="space-between" width="100%">
        <HStackVCenter width="160px">
          <UserProfilePicture userId={mutual.user.id} widthHeigth={36} />

          <VStack ml={4}>
            <Text>{mutual.user.username}</Text>
            {/* <Text></Text> */}
          </VStack>
        </HStackVCenter>
        <HStack width={140}>
          <Button
            width="100%"
            disabled={mutual.isSaved}
            isLoading={isLoading}
            colorScheme={isDisabled ? "gray" : "primary"}
            onPress={() => {
              submitRecommendItem(
                {
                  userId: mutual.user.id,
                  itemId: itemId!,
                },
                {
                  onSuccess: () => {
                    closeActionSheet()
                  },
                }
              )
            }}
          >
            {buttonLabel}
          </Button>

          {/* {!itsAuthUser && <FollowUnfollowButton profileUserId={user.id} />} */}
        </HStack>
      </HStack>
    </Actionsheet.Item>
  )
}

export default RecommendMutualItem
