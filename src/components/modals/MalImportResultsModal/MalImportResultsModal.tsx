import { Button, HStack, Modal, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { useImportItemsQuery } from "../../../hooks/react-query/import-item/useImportItemsQuery"
import useMalImportResultsModalStore from "../../../hooks/zustand/modals/useMalImportResultsModalStore"

const MalImportResultsModal = () => {
  const { isOpen, requestId, closeModal } = useMalImportResultsModalStore()
  const { data: importItems } = useImportItemsQuery(requestId)

  const ratedImportItems = useMemo(
    () => importItems?.filter((i) => i.syncroItem) || [],

    [importItems]
  )

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          <HStack justifyContent="space-between">
            <Text>Import MAL anime ratings ({ratedImportItems?.length})</Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            {ratedImportItems?.map((item) => (
              <HStack key={item.id}>
                <Text>
                  {item.syncroItem?.title} - {item.ratingValue}
                </Text>
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
