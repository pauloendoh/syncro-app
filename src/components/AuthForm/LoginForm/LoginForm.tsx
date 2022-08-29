import { Button, FormControl, Input, useToast, VStack } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import useAuthStore from "../../../hooks/zustand/useAuthStore";
import { AuthUserGetDto } from "../../../types/domain/auth/AuthUserGetDto";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";

interface LoginDto {
  identificator: string;
  password: string;
}

const LoginForm = () => {
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      identificator: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginDto) => {
    try {
      const res = await myAxios.post<AuthUserGetDto>(urls.api.login, data);
      toast.show({ description: "Success" });
      setAuthUser(res.data);
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || err.message);
    }
  };

  return (
    <VStack width="80%" space={4}>
      <FormControl isRequired isInvalid={!!errors.identificator}>
        <FormControl.Label>Username or Email</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
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
        <FormControl.Label>Last Name</FormControl.Label>
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

      <Button onPress={handleSubmit(onSubmit)} colorScheme="pink">
        Submit
      </Button>
    </VStack>
  );
};

export default LoginForm;
