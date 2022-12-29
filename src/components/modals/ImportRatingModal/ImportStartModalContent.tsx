import { FormControl, HStack, Input, Modal, Text } from "native-base"
import React, { useEffect, useState } from "react"
import { useAxios } from "../../../hooks/useAxios"
import SaveCancelButtons from "../../../screens/_common/buttons/SaveCancelButtons/SaveCancelButtons"
import { urls } from "../../../utils/urls"

interface Props {
  onCloseModal: () => void
  onGoNext: (data: { username: string; url: string }) => void
}

const ImportStartModalContent = (props: Props) => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername("")
  }, [])

  const [loading, setLoading] = useState(false)

  const axios = useAxios()

  const handleFirstSubmit = () => {
    setLoading(true)

    axios
      .post<{ username: string; url: string }>(urls.api.checkMalUser(username))
      .then((res) => {
        props.onGoNext(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Modal.Header borderBottomColor="transparent">
        <HStack justifyContent="space-between">
          <Text>Import MAL anime ratings</Text>
        </HStack>
      </Modal.Header>
      <>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>MyAnimeList username</FormControl.Label>
            <Input onChangeText={setUsername} value={username} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <SaveCancelButtons
            saveButtonWidth="120px"
            onSave={handleFirstSubmit}
            saveText="Check user"
            onCancel={props.onCloseModal}
            isLoadingAndDisabled={loading}
          />
        </Modal.Footer>
      </>
    </>
  )
}

export default ImportStartModalContent
