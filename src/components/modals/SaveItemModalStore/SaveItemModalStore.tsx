import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useQueryClient } from "@tanstack/react-query"
import {
  Button,
  HStack,
  Image,
  Modal,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base"
import React, { useMemo } from "react"
import useToggleSaveItemMutation from "../../../hooks/react-query/interest/useToggleSaveItemMutation"
import { useSyncroItemDetailsQuery } from "../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery"
import useSaveItemModalStore from "../../../hooks/zustand/modals/useSaveItemModalStore"
import PressableMyRating from "../../../screens/HomeNavigationScreens/HomeScreen/HomeRatingItem/HomeRatingItemButtons/PressableMyRating/PressableMyRating"
import HStackVCenter from "../../../screens/_common/flexboxes/HStackVCenter"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"
import { urls } from "../../../utils/urls"

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

  const queryClient = useQueryClient()

  const refreshItems = () => {
    if (syncroItem) queryClient.invalidateQueries([urls.api.findSavedItems])
  }

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
                <Text>{}</Text>
              </VStack>
              <VStack>
                <Text>You</Text>
                {syncroItem && <PressableMyRating itemId={syncroItem.id} />}
              </VStack>
            </HStack>
          </HStack>
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <HStackVCenter justifyContent={"center"} width="100%">
            <Button
              colorScheme={"error"}
              width="240px"
              onPress={() => {
                if (syncroItem)
                  submitToggleSave(syncroItem.id, {
                    onSuccess: () => {
                      refreshItems()
                      closeModal()
                    },
                  })
              }}
              isLoading={isLoading}
            >
              Remove from saved
            </Button>
          </HStackVCenter>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default SaveItemModalStore
