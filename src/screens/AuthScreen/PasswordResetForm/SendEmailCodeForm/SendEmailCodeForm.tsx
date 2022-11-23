import { isEmail } from "class-validator"
import { Button, FormControl, Input, Text } from "native-base"
import React, { useState } from "react"
import { useAxios } from "../../../../hooks/useAxios"
import usePasswordResetStore from "../../../../hooks/zustand/usePasswordResetStore"
import { urls } from "../../../../utils/urls"

interface Props {
  goNext: () => void
}

const SendEmailCodeForm = (props: Props) => {
  const [email, setEmail] = usePasswordResetStore((s) => [s.email, s.setEmail])

  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.sendPasswordResetEmail, { email })
      .then(() => {
        setSent(true)
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Text fontSize={"md"} fontWeight="bold">
        Password Reset
      </Text>

      <Text textAlign={"center"}>
        Tell us your email associated with Syncro and we’ll send a code to reset
        your password.
      </Text>

      <FormControl isRequired>
        <FormControl.Label>Email</FormControl.Label>

        <Input
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          autoComplete="email"
        />
      </FormControl>

      <Button
        disabled={!isEmail(email)}
        width="100%"
        mt={4}
        // onPress={handleSubmit(onSubmit)}
        colorScheme={!isEmail(email) ? "gray" : "primary"}
        isLoading={isLoading}
        onPress={submit}
      >
        Send Code
      </Button>
    </>
  )
}

export default SendEmailCodeForm
