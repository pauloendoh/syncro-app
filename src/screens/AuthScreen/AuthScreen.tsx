import { VStack } from "native-base"
import React, { useState } from "react"
import { KeyboardAvoidingView } from "react-native"
import AuthForm from "../../components/AuthForm/AuthForm"
import PasswordResetForm from "./PasswordResetForm/PasswordResetForm"

type AuthScreenFormType = "auth" | "passwordReset"

const AuthScreen = () => {
  const [form, setForm] = useState<AuthScreenFormType>("auth")
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={-200}
    >
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
    </KeyboardAvoidingView>
  )
}

export default AuthScreen
