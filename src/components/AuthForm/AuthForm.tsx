import { Link, Text, VStack } from "native-base"
import React, { useState } from "react"
import HStackVCenter from "../../screens/_common/flexboxes/HStackVCenter"
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

        <HStackVCenter>
          <Text>by </Text>
          <Link
            href="https://endoh.io"
            isExternal
            _text={{
              color: "primary.500",
            }}
          >
            endoh.io
          </Link>
        </HStackVCenter>
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
