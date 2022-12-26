import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import {
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  Select,
  Text,
  useTheme,
  VStack,
} from "native-base"
import React, { useMemo } from "react"
import { useSavedItemsQuery } from "../../../hooks/react-query/interest/useSavedItemsQuery"
import useToggleSaveItemMutation from "../../../hooks/react-query/interest/useToggleSaveItemMutation"
import useUpdateSavedPositionMutation from "../../../hooks/react-query/interest/useUpdateSavedPositionMutation"
import { useSyncroItemDetailsQuery } from "../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery"
import useSaveItemModalStore from "../../../hooks/zustand/modals/useSaveItemModalStore"
import PressableMyRating from "../../../screens/HomeNavigationScreens/HomeScreen/HomeRatingItem/HomeRatingItemButtons/PressableMyRating/PressableMyRating"
import HStackVCenter from "../../../screens/_common/flexboxes/HStackVCenter"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"

const SaveItemModalStore = () => {
  const { navigate } = useNavigation<
    NativeStackNavigationProp<HomeScreenTypes>
  >()

  const { isOpen, initialValue, closeModal } = useSaveItemModalStore()

  const { mutate: submitToggleSave, isLoading } = useToggleSaveItemMutation()

  const theme = useTheme()

  const { data: syncroItem } = useSyncroItemDetailsQuery(
    initialValue?.syncroItemId
  )

  const title = useMemo(() => {
    if (syncroItem?.year) return `${syncroItem?.title} (${syncroItem?.year})`
    return syncroItem?.title
  }, [syncroItem])

  const { data: savedItems } = useSavedItemsQuery()

  const positionOptions = useMemo(() => {
    if (!savedItems) return []
    const items = savedItems.filter(
      (item) => item.syncroItem?.type === syncroItem?.type
    )

    return items.map((item) => ({
      value: item.position.toString(),
      label: item.position.toString(),
    }))
  }, [syncroItem, savedItems])

  const { mutate: submitUpdatePosition } = useUpdateSavedPositionMutation()

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="xl">
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          <HStack justifyContent="space-between" width="100%">
            <Text fontSize="sm">{title}</Text>
            <AntDesign
              name="close"
              size={20}
              color={theme.colors.dark[900]}
              onPress={closeModal}
            />
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <HStack space={4}>
            <Pressable
              onPress={() => {
                if (syncroItem) {
                  closeModal()
                  navigate("SyncroItem", {
                    itemId: syncroItem.id,
                  })
                }
              }}
            >
              <Image
                src={getImageUrlOrDefaultUrl(syncroItem?.imageUrl)}
                width={108}
                height={108}
                mt={2}
                mb={2}
                alt={title || ""}
              />
            </Pressable>
            <HStack space={8}>
              <VStack>
                <Text>Position</Text>

                <Select
                  selectedValue={initialValue?.position.toString()}
                  width="80px"
                  _actionSheetBody={{
                    size: "xs",
                  }}
                  onValueChange={(val) => {
                    if (!initialValue) return

                    const newPosition = Number(val)

                    submitUpdatePosition(
                      {
                        interestId: initialValue?.id,
                        newPosition,
                      },
                      {
                        onSuccess: () => {
                          closeModal()
                        },
                      }
                    )
                  }}
                >
                  {positionOptions.map((option) => (
                    <Select.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Select>
              </VStack>
              <VStack>
                <Text>You</Text>
                {syncroItem && <PressableMyRating itemId={syncroItem.id} />}
              </VStack>
            </HStack>
          </HStack>
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          {syncroItem && (
            <HStackVCenter justifyContent={"center"} width="100%">
              <Button
                colorScheme={"error"}
                width="240px"
                onPress={() => {
                  if (syncroItem)
                    submitToggleSave(syncroItem.id, {
                      onSuccess: () => {
                        closeModal()
                      },
                    })
                }}
                isLoading={isLoading}
              >
                Remove from saved
              </Button>
            </HStackVCenter>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default SaveItemModalStore
