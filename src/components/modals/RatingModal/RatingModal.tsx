import { AirbnbRating } from "react-native-ratings"

import { Button, HStack, Modal, Text, useTheme } from "native-base"
import React, { useEffect, useState } from "react"
import { useImdbItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import useSaveRatingMutation from "../../../hooks/react-query/rating/useSaveRatingMutation"
import useRatingModalStore from "../../../hooks/zustand/modals/useRatingModalStore"
import { RatingDto } from "../../../types/domain/rating/RatingDto"
import { getLabelByRatingValue } from "./getLabelByRatingValue"

const RatingModal = () => {
  const { isOpen, initialValue, closeModal } = useRatingModalStore()

  const { mutate } = useSaveRatingMutation()
  // const { mutate: mutateDeleteTag } = useDeleteTagMutation()

  const onSubmit = async (data: RatingDto) => {
    mutate(data, {
      onSuccess: closeModal,
    })
  }

  const theme = useTheme()

  const { data: imdbItem } = useImdbItemDetailsQuery(initialValue?.imdbItemId)

  const [rating, setRating] = useState<number | null>(null)
  useEffect(() => {
    setRating(initialValue?.ratingValue || null)
  }, [initialValue])

  const handleChangeRating = (newRating: number) => {
    if (newRating === rating) {
      setRating(null)
      return
    }

    setRating(newRating)
  }

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
              How would you rate {imdbItem?.title}?
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
            defaultRating={Number(rating)}
            size={20}
            count={10}
          />
        </Modal.Body>
        <Modal.Footer borderTopColor="transparent">
          <Button
            onPress={() => {
              if (initialValue)
                onSubmit({ ...initialValue, ratingValue: rating })
            }}
            colorScheme={"secondary"}
            width="100%"
          >
            {getLabelByRatingValue(rating)}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default RatingModal
