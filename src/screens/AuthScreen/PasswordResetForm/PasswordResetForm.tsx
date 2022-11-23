import { Link, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { resetPasswordResetStore } from "../../../hooks/zustand/usePasswordResetStore"
import ConfirmCodeForm from "./ConfirmCodeForm/ConfirmCodeForm"
import ConfirmNewPasswordForm from "./ConfirmNewPasswordForm/ConfirmNewPasswordForm"
import SendEmailCodeForm from "./SendEmailCodeForm/SendEmailCodeForm"

type Stage = "sendCode" | "confirmCode" | "newPassword"

interface Props {
  onChangeForm: () => void
}

const PasswordResetForm = (props: Props) => {
  const [currentStage, setCurrentStage] = useState<Stage>("sendCode")

  useEffect(() => {
    resetPasswordResetStore()
  }, [])

  return (
    <VStack
      paddingY="4"
      px={4}
      bgColor="dark.100"
      width="300px"
      borderRadius={4}
      alignItems="center"
      space={4}
    >
      {currentStage === "sendCode" && (
        <SendEmailCodeForm goNext={() => setCurrentStage("confirmCode")} />
      )}

      {currentStage === "confirmCode" && (
        <ConfirmCodeForm goNext={() => setCurrentStage("newPassword")} />
      )}

      {currentStage === "newPassword" && (
        <ConfirmNewPasswordForm goNext={props.onChangeForm} />
      )}

      <Link
        mt={4}
        onPress={props.onChangeForm}
        _text={{
          color: "primary.500",
        }}
      >
        Return to sign in
      </Link>
    </VStack>
  )
}

export default PasswordResetForm
