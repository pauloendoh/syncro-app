import { VStack } from "native-base"
import React, { useState } from "react"
import AuthForm from "../../components/AuthForm/AuthForm"
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm"

type AuthScreenFormType = "auth" | "passwordReset"

const AuthScreen = () => {
  const [form, setForm] = useState<AuthScreenFormType>("auth")
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      flex="1"
      backgroundColor="#1E1E1E"
    >
      {form === "auth" ? (
        <AuthForm onChangeForm={() => setForm("passwordReset")} />
      ) : (
        <PasswordResetForm onChangeForm={() => setForm("auth")} />
      )}
    </VStack>
  )
}

export default AuthScreen
