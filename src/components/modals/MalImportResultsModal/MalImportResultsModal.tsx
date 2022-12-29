import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button, HStack, Modal, Text, useTheme, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import { useImportItemsQuery } from "../../../hooks/react-query/import-item/useImportItemsQuery"
import { useMyNavigation } from "../../../hooks/useMyNavigation"
import useMalImportResultsModalStore from "../../../hooks/zustand/modals/useMalImportResultsModalStore"
import HStackVCenter from "../../../screens/_common/flexboxes/HStackVCenter"
import SyncroItemIcon from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemIcon"
import ImportResultsModalTabs from "./ImportResultsModalTabs/ImportResultsModalTabs"

const MalImportResultsModal = () => {
  const { isOpen, requestId, closeModal } = useMalImportResultsModalStore()
  const { data: importItems } = useImportItemsQuery(
    requestId,
    !!requestId && isOpen
  )

  const ratedImportItems = useMemo(
    () => importItems?.filter((i) => i.syncroItem) || [],

    [importItems]
  )

  const { navigate } = useMyNavigation()

  const [tabIndex, setTabIndex] = useState(0)

  const filteredItems = useMemo(() => {
    if (!ratedImportItems) return []
    if (tabIndex === 0)
      return ratedImportItems.filter((i) => i.status === "importedSuccessfully")

    if (tabIndex === 1)
      return ratedImportItems.filter((i) => i.status === "alreadyRated")

    if (tabIndex === 2)
      return ratedImportItems.filter((i) => i.status === "errorOrNotFound")

    return []
  }, [tabIndex, ratedImportItems])

  const theme = useTheme()

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="xl">
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          <HStack justifyContent="space-between">
            <Text fontSize="lg">Anime import - Results</Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <ImportResultsModalTabs
            changeTabIndex={setTabIndex}
            tabIndex={tabIndex}
            requestId={requestId}
          />

          <VStack mt={4}>
            {filteredItems.map((item) => (
              <HStack
                key={item.id}
                justifyContent="space-between"
                alignItems="flex-start"
                py={4}
                borderBottomColor={theme.colors.gray[500]}
                borderBottomWidth={0.25}
              >
                <Text
                  color="primary.500"
                  flex={1}
                  flexWrap="wrap"
                  onPress={() => {
                    if (item.syncroItem) {
                      navigate("SyncroItem", {
                        itemId: item.syncroItem.id,
                      })
                      closeModal()
                    }
                  }}
                >
                  {item.syncroItem && (
                    <>
                      {item.syncroItem.title}
                      {item.syncroItem.year &&
                        ` (${item.syncroItem.year})`}{" "}
                      <SyncroItemIcon
                        type={item.syncroItem.type}
                        size={12}
                        color={theme.colors.primary[500]}
                      />
                    </>
                  )}
                </Text>

                <HStackVCenter space={1}>
                  <MaterialCommunityIcons
                    name={"star"}
                    color={theme.colors.secondary[500]}
                    size={14}
                  />
                  <Text color="secondary.500">{item.ratingValue}</Text>
                </HStackVCenter>
              </HStack>
            ))}
          </VStack>
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <Button colorScheme="primary" onPress={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default MalImportResultsModal
