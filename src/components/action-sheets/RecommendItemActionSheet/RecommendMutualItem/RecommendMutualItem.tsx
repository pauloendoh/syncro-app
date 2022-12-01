import { Actionsheet, Button, HStack, Text, VStack } from "native-base"
import React from "react"
import useRecommendItemMutation from "../../../../hooks/react-query/imdb-item/useRecommendItemMutation"
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

  const { closeActionSheet } = useRecommendItemActionSheetStore()

  return (
    <Actionsheet.Item
      key={mutual.user.id}
      disabled={mutual.isSaved}
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
            colorScheme={mutual.isSaved ? "gray" : "primary"}
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
            {mutual.isSaved ? "Already saved" : "Recommend"}
          </Button>

          {/* {!itsAuthUser && <FollowUnfollowButton profileUserId={user.id} />} */}
        </HStack>
      </HStack>
    </Actionsheet.Item>
  )
}

export default RecommendMutualItem
