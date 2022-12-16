import React from "react"
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"
import ImportRatingModal from "./ImportRatingModal/ImportRatingModal"
import InterestModal from "./InterestModal/InterestModal"
import RatingModal from "./RatingModal/RatingModal"

interface Props {
  test?: string
}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ImportRatingModal />
      <ConfirmationModal />
      <RatingModal />
      <InterestModal />
    </>
  )
}

export default GlobalModals
