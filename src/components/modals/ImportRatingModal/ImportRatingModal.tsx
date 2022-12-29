import { Button, Modal, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { useAxios } from "../../../hooks/useAxios"
import useImportRatingsModalStore from "../../../hooks/zustand/modals/useImportRatingsModalStore"
import { useMyToast } from "../../toasts/useMyToast"
import ImportConfirmModalContent from "./ImportConfirmModalContent"
import ImportStartModalContent from "./ImportStartModalContent"

const ImportRatingModal = () => {
  const { isOpen, initialValue, closeModal } = useImportRatingsModalStore()

  const [loading, setLoading] = useState(false)

  const axios = useAxios()
  const { showSuccessToast } = useMyToast()

  const [modalState, setModalState] = useState<
    "start" | "confirm" | "confirmed"
  >("start")

  const [confirmData, setConfirmData] = useState<{
    username: string
    url: string
  }>()

  useEffect(() => {
    if (isOpen) setModalState("start")
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content>
        {modalState === "start" && (
          <ImportStartModalContent
            onCloseModal={closeModal}
            onGoNext={(data) => {
              setConfirmData(data)
              setModalState("confirm")
            }}
          />
        )}
        {modalState === "confirm" && confirmData && (
          <ImportConfirmModalContent
            confirmData={confirmData}
            onCloseModal={closeModal}
            onGoNext={() => setModalState("confirmed")}
          />
        )}

        {modalState === "confirmed" && (
          <>
            <Modal.Body>
              <Text>
                Your import has started! 😃 You will be notified when it
                finishes!
              </Text>
            </Modal.Body>
            <Modal.Footer borderTopColor="transparent">
              <Button colorScheme="primary" onPress={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default ImportRatingModal
