import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, FormControl, Input, Link, Text, VStack } from "native-base"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useAxios } from "../../../hooks/useAxios"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import HStackVCenter from "../../../screens/_common/flexboxes/HStackVCenter"
import { AuthUserGetDto } from "../../../types/domain/auth/AuthUserGetDto"
import { storageKeys } from "../../../utils/storageKeys"
import { urls } from "../../../utils/urls"
import { useMyToast } from "../../toasts/useMyToast"

interface LoginDto {
  identificator: string
  password: string
}

interface Props {
  onToggleForm: () => void
  onPressPasswordReset: () => void
}

const LoginForm = (props: Props) => {
  const setAuthUser = useAuthStore((s) => s.setAuthUser)
  const { showSuccessToast } = useMyToast()

  const axios = useAxios()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      identificator: "",
      password: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginDto) => {
    setLoading(true)

    const pushToken = await AsyncStorage.getItem(storageKeys.pushToken)

    axios
      .post<AuthUserGetDto>(urls.api.login(pushToken), data)
      .then((res) => {
        showSuccessToast("Success")

        setAuthUser(res.data)
      })
      .finally(() => setLoading(false))
  }

  return (
    <VStack width="90%" space={4}>
      <FormControl isInvalid={!!errors.identificator}>
        <FormControl.Label>Username or Email</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              autoCapitalize="none"
              autoComplete="username"
              textContentType="username"
            />
          )}
          name="identificator"
          rules={{ required: "Field is required", minLength: 3 }}
        />
        <FormControl.ErrorMessage>
          {errors.identificator?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormControl.Label>Password</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              textContentType="password"
              type="password"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password"
        />
        <FormControl.ErrorMessage>
          {errors.password?.message}
        </FormControl.ErrorMessage>
      </FormControl>

      <HStackVCenter justifyContent="flex-end">
        <Link
          onPress={props.onPressPasswordReset}
          _text={{ color: "primary.500" }}
        >
          Forgot your password?
        </Link>
      </HStackVCenter>

      <Button
        onPress={handleSubmit(onSubmit)}
        color="primary"
        isLoading={loading}
      >
        LOGIN
      </Button>

      <VStack alignItems="center" space="4">
        <VStack alignItems="center">
          <Text>Don't have an account?</Text>
          <Link onPress={props.onToggleForm} _text={{ color: "primary.500" }}>
            Sign up
          </Link>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default LoginForm
