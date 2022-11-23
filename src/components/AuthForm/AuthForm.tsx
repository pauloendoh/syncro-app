import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Box, Button, Divider, Link, Text, useTheme, VStack } from "native-base"
import React, { useState } from "react"
import { useAxios } from "../../hooks/useAxios"
import useAuthStore from "../../hooks/zustand/useAuthStore"
import VStackHCenter from "../../screens/_common/flexboxes/VStackHCenter"
import { AuthUserGetDto } from "../../types/domain/auth/AuthUserGetDto"
import { urls } from "../../utils/urls"
import { useMyToast } from "../toasts/useMyToast"
import LoginForm from "./LoginForm/LoginForm"
import SignUpForm from "./SignUpForm/SignUpForm"

interface Props {
  onChangeForm: () => void
}

const AuthForm = (props: Props) => {
  type FormType = "register" | "login"

  const [currentForm, setCurrentForm] = useState<FormType>("login")

  const axios = useAxios()
  const setAuthUser = useAuthStore((s) => s.setAuthUser)

  const { showSuccessToast } = useMyToast()
  const handleTempSignIn = () => {
    // PE 2/3
    axios.get<AuthUserGetDto>(urls.api.tempUser).then((res) => {
      setAuthUser(res.data)
      showSuccessToast("Logged with temp user!")
    })
  }

  const theme = useTheme()

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
        <LoginForm
          onToggleForm={() => setCurrentForm("register")}
          onPressPasswordReset={props.onChangeForm}
        />
      )}

      <VStackHCenter backgroundColor="red" width="100%" px={4}>
        <Text>or</Text>
        <Box mt={4} />

        <Button
          onPress={handleTempSignIn}
          width="100%"
          startIcon={
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={theme.colors.dark[900]}
            />
          }
          _text={{
            color: theme.colors.dark[900],
          }}
          backgroundColor="dark.300"
        >
          Enter with temp user
        </Button>
      </VStackHCenter>

      <Divider />
      <Text textAlign={"center"}>
        <Text>By signing in, you agree to Syncro’s </Text>
        <Link
          href="https://pauloendoh.github.io/syncro-app/"
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
