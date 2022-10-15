import { AxiosError } from "axios"
import {
  Button,
  FormControl,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "native-base"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert } from "react-native"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { AuthUserGetDto } from "../../../types/domain/auth/AuthUserGetDto"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"

interface LoginDto {
  identificator: string
  password: string
}

interface Props {
  onToggleForm: () => void
}

const LoginForm = (props: Props) => {
  const setAuthUser = useAuthStore((s) => s.setAuthUser)
  const toast = useToast()

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
  const onSubmit = async (data: LoginDto) => {
    myAxios
      .post<AuthUserGetDto>(urls.api.login, data)
      .then((res) => {
        toast.show({ description: "Success" })
        setAuthUser(res.data)
      })
      .catch((err: AxiosError<{ message: string }>) => {
        Alert.alert("Error", err.response?.data?.message || err.message)
        throw new Error(`url: ${urls.api.login}; data: ${JSON.stringify(data)}`)
      })
  }

  return (
    <VStack width="80%" space={4}>
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

      <Button onPress={handleSubmit(onSubmit)} color="primary">
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
