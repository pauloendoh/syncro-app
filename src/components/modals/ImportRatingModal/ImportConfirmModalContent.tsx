import { HStack, Link, Modal, Text } from "native-base"
import React, { useState } from "react"
import { useAxios } from "../../../hooks/useAxios"
import SaveCancelButtons from "../../../screens/_common/buttons/SaveCancelButtons/SaveCancelButtons"
import { urls } from "../../../utils/urls"

interface Props {
  confirmData: { username: string; url: string }
  onCloseModal: () => void
  onGoNext: () => void
}

const ImportConfirmModalContent = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const axios = useAxios()

  const handleSubmit = () => {
    setLoading(true)

    axios
      .post(urls.api.confirmAndStartAnimeImport(props.confirmData.username))
      .then(() => {
        props.onGoNext()
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Modal.Header borderBottomColor="transparent">
        <HStack justifyContent="space-between">
          <Text>Is this your profile?</Text>
        </HStack>
      </Modal.Header>
      <Modal.Body>
        <Link href={props.confirmData.url} _text={{ color: "primary.500" }}>
          {props.confirmData.url}
        </Link>
      </Modal.Body>
      <Modal.Footer borderTopColor="transparent">
        <SaveCancelButtons
          saveButtonWidth="96px"
          onSave={handleSubmit}
          saveText="Confirm"
          onCancel={props.onCloseModal}
          isLoadingAndDisabled={loading}
        />
      </Modal.Footer>
    </>
  )
}

export default ImportConfirmModalContent
