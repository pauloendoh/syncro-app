import { Button, FormControl, HStack, Input, Modal, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { useAxios } from "../../../hooks/useAxios"
import useImportRatingsModalStore from "../../../hooks/zustand/modals/useImportRatingsModalStore"
import SaveCancelButtons from "../../../screens/_common/buttons/SaveCancelButtons/SaveCancelButtons"
import { urls } from "../../../utils/urls"
import { useMyToast } from "../../toasts/useMyToast"

const ImportRatingModal = () => {
  const { isOpen, initialValue, closeModal } = useImportRatingsModalStore()

  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  const axios = useAxios()
  const { showSuccessToast } = useMyToast()

  const [hasRequested, setHasRequested] = useState(false)
  useEffect(() => {
    if (isOpen) setHasRequested(false)
  }, [isOpen])

  const handleSubmit = () => {
    setLoading(true)

    axios
      .post(urls.api.importRatings, {
        username,
      })
      .then(() => {
        setHasRequested(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          <HStack justifyContent="space-between">
            <Text>Import MAL anime ratings</Text>
          </HStack>
        </Modal.Header>
        <>
          <Modal.Body>
            {hasRequested ? (
              <Text>
                Your import has started! 😃 You will be notified when it
                finishes!
              </Text>
            ) : (
              <FormControl>
                <FormControl.Label>MyAnimeList username</FormControl.Label>
                <Input onChangeText={setUsername} value={username} />
              </FormControl>
            )}
          </Modal.Body>
          <Modal.Footer borderTopColor="transparent">
            {hasRequested ? (
              <Button colorScheme="primary" onPress={closeModal}>
                Close
              </Button>
            ) : (
              <SaveCancelButtons
                saveButtonWidth="96px"
                onSave={handleSubmit}
                saveText="Import"
                onCancel={closeModal}
                isLoadingAndDisabled={loading}
              />
            )}
          </Modal.Footer>
        </>
      </Modal.Content>
    </Modal>
  )
}

export default ImportRatingModal
