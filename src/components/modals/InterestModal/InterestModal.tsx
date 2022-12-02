import { AirbnbRating } from "react-native-ratings"

import { Button, HStack, Modal, Text, useTheme } from "native-base"
import React, { useEffect, useState } from "react"
import { useImdbItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import useSaveInterestMutation from "../../../hooks/react-query/interest/useSaveInterestMutation"
import useInterestModalStore from "../../../hooks/zustand/modals/useInterestModalStore"
import { InterestDto } from "../../../types/domain/interest/InterestDto"
import { urls } from "../../../utils/urls"
import { getLabelByInterestValue } from "./getLabelByInterestValue"

const InterestModal = () => {
  const { isOpen, initialValue, closeModal } = useInterestModalStore()

  const { mutate, isLoading } = useSaveInterestMutation()
  // const { mutate: mutateDeleteTag } = useDeleteTagMutation()

  const onSubmit = async (data: InterestDto) => {
    mutate(data, {
      onSuccess: closeModal,
    })
  }

  const theme = useTheme()

  const { data: imdbItem } = useImdbItemDetailsQuery(initialValue?.syncroItemId)

  const [localInterest, setLocalInterest] = useState<number | null>(null)
  useEffect(() => {
    setLocalInterest(initialValue?.interestLevel || null)
  }, [initialValue])

  const handleChangeRating = (newRating: number) => {
    if (newRating === localInterest) {
      setLocalInterest(null)
      return
    }

    setLocalInterest(newRating)
  }

  console.log(urls.api.apiImages("fire-flame-curved-solid.svg"))

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content>
        <Modal.Header borderBottomColor="transparent">
          <HStack justifyContent="space-between">
            <Text
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              How interested are you in watching {imdbItem?.title}?
            </Text>

            {/* <AntDesign
              name="close"
              size={24}
              color={theme.colors.dark[500]}
              onPress={closeModal}
            /> */}
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <AirbnbRating
            showRating={false}
            onFinishRating={handleChangeRating}
            selectedColor={theme.colors.secondary[500]}
            defaultRating={Number(localInterest)}
            size={20}
            count={3}
          />
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <Button
            onPress={() => {
              if (initialValue)
                onSubmit({ ...initialValue, interestLevel: localInterest })
            }}
            colorScheme={"secondary"}
            width="100%"
            isLoading={isLoading}
          >
            {getLabelByInterestValue(localInterest)}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default InterestModal
