import React from "react"
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"
import ImportRatingModal from "./ImportRatingModal/ImportRatingModal"

interface Props {
  test?: string
}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ImportRatingModal />
      <ConfirmationModal />
    </>
  )
}

export default GlobalModals
