import React from "react"
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"
import ImportRatingModal from "./ImportRatingModal/ImportRatingModal"
import MalImportResultsModal from "./MalImportResultsModal/MalImportResultsModal"
import RatingModal from "./RatingModal/RatingModal"
import SaveItemModalStore from "./SaveItemModal/SaveItemModal"

interface Props {
  test?: string
}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ImportRatingModal />
      <ConfirmationModal />
      <RatingModal />
      <SaveItemModalStore />
      <MalImportResultsModal />
    </>
  )
}

export default GlobalModals
