import { Button, FormControl, Input, Link, Text, VStack } from "native-base"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useAxios } from "../../../hooks/useAxios"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { AuthUserGetDto } from "../../../types/domain/auth/AuthUserGetDto"
import { urls } from "../../../utils/urls"
import { useMyToast } from "../../toasts/useMyToast"

interface Props {
  onToggleForm: () => void
}

interface ISignUpDto {
  username: string
  email: string
  password1: string
  password2: string
}

const SignUpForm = (props: Props) => {
  const setAuthUser = useAuthStore((s) => s.setAuthUser)

  const { showSuccessToast } = useMyToast()

  const axios = useAxios()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpDto>({
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ISignUpDto) => {
    try {
      setLoading(true)
      const res = await axios.post<AuthUserGetDto>(urls.api.register, data)

      setLoading(false)
      setAuthUser(res.data)
      showSuccessToast("Success")
    } catch (err: unknown) {
      console.log({ err })
      setLoading(false)
    }
  }

  return (
    <VStack width="90%" space={4}>
      <FormControl isRequired isInvalid={"username" in errors}>
        <FormControl.Label>Username</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="username"
          rules={{ required: "Field is required", minLength: 3 }}
        />
        <FormControl.ErrorMessage>
          {errors.username?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.email}>
        <FormControl.Label>Email</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              autoCapitalize="none"
              autoComplete="email"
            />
          )}
          name="email"
          rules={{ required: "Field is required", minLength: 3 }}
        />
        <FormControl.ErrorMessage>
          {errors.email?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password1}>
        <FormControl.Label>Password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              type="password"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password1"
        />
        <FormControl.ErrorMessage>
          {errors.password1?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={"password2" in errors}>
        <FormControl.Label>Confirm Password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              type="password"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password2"
        />
        <FormControl.ErrorMessage>
          {errors.password2?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <Button
        onPress={handleSubmit(onSubmit)}
        color="primary"
        isLoading={loading}
      >
        SIGN UP
      </Button>

      <VStack alignItems="center" space="4">
        <VStack alignItems="center">
          <Text>Already have an account?</Text>
          <Link onPress={props.onToggleForm} _text={{ color: "primary.500" }}>
            Login
          </Link>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default SignUpForm
