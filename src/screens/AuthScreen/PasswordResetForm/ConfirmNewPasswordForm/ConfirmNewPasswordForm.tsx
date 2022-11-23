import { Button, FormControl, Input, Text } from "native-base"
import React, { useMemo, useState } from "react"
import { useMyToast } from "../../../../components/toasts/useMyToast"
import { useAxios } from "../../../../hooks/useAxios"
import usePasswordResetStore from "../../../../hooks/zustand/usePasswordResetStore"
import { urls } from "../../../../utils/urls"

interface Props {
  goNext: () => void
}

const ConfirmNewPasswordForm = (props: Props) => {
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const [code, email] = usePasswordResetStore((s) => [s.code, s.email])

  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios()
  const { showSuccessToast } = useMyToast()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.endPasswordReset, { email, code, password })
      .then(() => {
        showSuccessToast("New password saved!")
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  const buttonDisabled = useMemo(() => {
    if (!password || !password2 || password !== password2) return true

    return false
  }, [password, password2])

  return (
    <>
      <Text fontSize={"md"} fontWeight="bold">
        Reset Password
      </Text>

      <FormControl isRequired mt={4}>
        <FormControl.Label>Password</FormControl.Label>

        <Input
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          autoComplete="password"
          type="password"
        />
      </FormControl>

      <FormControl isRequired mt={2}>
        <FormControl.Label>Confirm password</FormControl.Label>

        <Input
          onChangeText={setPassword2}
          value={password2}
          autoCapitalize="none"
          autoComplete="password"
          type="password"
        />
      </FormControl>

      <Button
        mt={4}
        disabled={buttonDisabled}
        width="100%"
        colorScheme={buttonDisabled ? "gray" : "primary"}
        isLoading={isLoading}
        onPress={submit}
      >
        Reset Password
      </Button>
    </>
  )
}

export default ConfirmNewPasswordForm
