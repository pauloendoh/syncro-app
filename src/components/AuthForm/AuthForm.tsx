import { Divider, Link, Text, VStack } from "native-base"
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
      px={4}
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

        {/* <HStackVCenter>
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
        </HStackVCenter> */}
      </VStack>
      {currentForm === "register" && (
        <SignUpForm onToggleForm={() => setCurrentForm("login")} />
      )}
      {currentForm === "login" && (
        <LoginForm onToggleForm={() => setCurrentForm("register")} />
      )}

      <Divider />
      <Text textAlign={"center"}>
        <Text>By signing in, you agree to Syncro’s </Text>
        <Link
          href="https://pauloendoh.github.io/ration-app/"
          isExternal
          style={{ display: "flex" }}
          _text={{
            color: "primary.500",
          }}
        >
          Conditions of Use
        </Link>
      </Text>
    </VStack>
  )
}

export default AuthForm
