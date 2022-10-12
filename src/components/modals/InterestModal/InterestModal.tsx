import { AirbnbRating } from "react-native-ratings"

import { Button, HStack, Modal, Text, useTheme } from "native-base"
import React, { useEffect, useState } from "react"
import { useImdbItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import useSaveRatingMutation from "../../../hooks/react-query/rating/useSaveRatingMutation"
import useInterestModalStore from "../../../hooks/zustand/modals/useInterestModalStore"
import { RatingDto } from "../../../types/domain/rating/RatingDto"
import { urls } from "../../../utils/urls"
import { getLabelByInterestValue } from "./getLabelByInterestValue"

const InterestModal = () => {
  const { isOpen, initialValue, closeModal } = useInterestModalStore()

  const { mutate } = useSaveRatingMutation()
  // const { mutate: mutateDeleteTag } = useDeleteTagMutation()

  const onSubmit = async (data: RatingDto) => {
    mutate(data, {
      onSuccess: closeModal,
    })
  }

  const theme = useTheme()

  const { data: imdbItem } = useImdbItemDetailsQuery(initialValue?.imdbItemId)

  const [interest, setInterest] = useState<number | null>(null)
  useEffect(() => {
    setInterest(initialValue?.interestLevel || null)
  }, [initialValue])

  const handleChangeRating = (newRating: number) => {
    if (newRating === interest) {
      setInterest(null)
      return
    }

    setInterest(newRating)
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
            selectedColor={theme.colors.secondary[700]}
            defaultRating={Number(interest)}
            size={20}
            count={3}
          />
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <Button
            onPress={() => {
              if (initialValue)
                onSubmit({ ...initialValue, interestLevel: interest })
            }}
            colorScheme={"secondary"}
            width="100%"
          >
            {getLabelByInterestValue(interest)}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default InterestModal
