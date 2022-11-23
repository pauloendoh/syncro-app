import { Button, FormControl, Input, Text } from "native-base"
import React, { useState } from "react"
import { useAxios } from "../../../../hooks/useAxios"
import usePasswordResetStore from "../../../../hooks/zustand/usePasswordResetStore"
import { urls } from "../../../../utils/urls"

interface Props {
  goNext: () => void
}

const ConfirmCodeForm = (props: Props) => {
  const [code, setCode, email] = usePasswordResetStore((s) => [
    s.code,
    s.setCode,
    s.email,
  ])

  const [isLoading, setIsLoading] = useState(false)

  const axios = useAxios()

  const submit = () => {
    setIsLoading(true)
    axios
      .post<boolean>(urls.api.confirmPasswordResetCode, { email, code })
      .then(() => {
        props.goNext()
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <Text fontSize={"md"} fontWeight="bold">
        Confirm your code
      </Text>

      <FormControl isRequired mt={4}>
        <Input onChangeText={setCode} value={code} autoCapitalize="none" />
      </FormControl>

      <Button
        mt={4}
        disabled={code.length !== 6}
        width="100%"
        colorScheme={code.length !== 6 ? "gray" : "primary"}
        isLoading={isLoading}
        onPress={submit}
      >
        Confirm Code
      </Button>
    </>
  )
}

export default ConfirmCodeForm
