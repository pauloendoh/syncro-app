import { Actionsheet, Button, HStack, Text, VStack } from "native-base"
import React from "react"
import useRecommendItemMutation from "../../hooks/react-query/imdb-item/useRecommendItemMutation"
import { useMutualsSavedItemQuery } from "../../hooks/react-query/user/useMutualsSavedItemQuery"
import useRecommendItemActionSheetStore from "../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import HStackVCenter from "../../screens/_common/flexboxes/HStackVCenter"
import UserProfilePicture from "../UserProfilePicture/UserProfilePicture"

interface Props {}

const RecommendItemActionSheet = (props: Props) => {
  const {
    isOpen,
    closeActionSheet,
    itemId,
  } = useRecommendItemActionSheetStore()
  const { data: mutuals } = useMutualsSavedItemQuery(itemId!)

  const { mutate: submitRecommendItem } = useRecommendItemMutation()

  return (
    <Actionsheet isOpen={isOpen} onClose={closeActionSheet}>
      <Actionsheet.Content>
        {mutuals?.map((m) => (
          <Actionsheet.Item
            key={m.user.id}
            disabled={m.isSaved}
            pr={6}
            width="100%"
            _pressed={{
              background: "unset",
            }}
          >
            <HStack justifyContent="space-between" width="100%">
              <HStackVCenter width="160px">
                <UserProfilePicture userId={m.user.id} widthHeigth={36} />

                <VStack ml={4}>
                  <Text>{m.user.username}</Text>
                  {/* <Text></Text> */}
                </VStack>
              </HStackVCenter>
              <HStack width={140}>
                <Button
                  width="100%"
                  disabled={m.isSaved}
                  colorScheme={m.isSaved ? "gray" : "primary"}
                  onPress={() => {
                    submitRecommendItem(
                      {
                        userId: m.user.id,
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
                  {m.isSaved ? "Already saved" : "Recommend"}
                </Button>

                {/* {!itsAuthUser && <FollowUnfollowButton profileUserId={user.id} />} */}
              </HStack>
            </HStack>
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default RecommendItemActionSheet
