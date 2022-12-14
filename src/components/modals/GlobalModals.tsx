import React from "react"
import ImportRatingModal from "./ImportRatingModal/ImportRatingModal"

interface Props {
  test?: string
}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ImportRatingModal />
    </>
  )
}

export default GlobalModals
