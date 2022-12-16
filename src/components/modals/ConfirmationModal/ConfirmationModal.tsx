import { Modal } from "native-base"
import React from "react"
import useConfirmationModalStore from "../../../hooks/zustand/modals/useConfirmationModalStore"
import SaveCancelButtons from "../../../screens/_common/buttons/SaveCancelButtons/SaveCancelButtons"

const ConfirmationModal = () => {
  const { isOpen, closeModal, initialValue } = useConfirmationModalStore()

  const confirmAndClose = () => {
    closeModal()
    initialValue.onConfirm()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          {initialValue.title}
        </Modal.Header>
        {initialValue.description ? (
          <Modal.Body>{initialValue.description}</Modal.Body>
        ) : null}

        <Modal.Footer borderTopColor="transparent">
          <SaveCancelButtons
            onSave={confirmAndClose}
            saveText={
              initialValue.confirmText ? initialValue.confirmText : "Yes"
            }
            saveButtonWidth="64px"
            onCancel={closeModal}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmationModal
