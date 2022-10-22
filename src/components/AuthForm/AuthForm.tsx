import { Text, VStack } from "native-base"
import React, { useState } from "react"
import LoginForm from "./LoginForm/LoginForm"
import SignUpForm from "./SignUpForm/SignUpForm"

interface Props {
  test?: string
}

const AuthForm = (props: Props) => {
  type FormType = "register" | "login"

  const [currentForm, setCurrentForm] = useState<FormType>("login")

  return (
    <VStack
      paddingY="4"
      bgColor="dark.100"
      width="300px"
      borderRadius={4}
      alignItems="center"
      space={4}
    >
      <VStack alignItems="center">
        <Text fontSize="xl" fontWeight="semibold">
          Syncro
        </Text>
      </VStack>
      {currentForm === "register" && (
        <SignUpForm onToggleForm={() => setCurrentForm("login")} />
      )}
      {currentForm === "login" && (
        <LoginForm onToggleForm={() => setCurrentForm("register")} />
      )}
    </VStack>
  )
}

export default AuthForm
