import { Ionicons } from "@expo/vector-icons"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

import { useFocusEffect } from "@react-navigation/native"
import {
  FormControl,
  IconButton,
  Input,
  Pressable,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "native-base"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { ScrollView } from "react-native"
import useUpdateProfileMutation from "../../../hooks/react-query/profile/useUpdateProfileMutation"
import { useMyColors } from "../../../hooks/useMyColors"
import useAuthStore from "../../../hooks/zustand/useAuthStore"
import { ProfilePutDto } from "../../../types/domain/profile/ProfilePutDto"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import VStackHCenter from "../../_common/flexboxes/VStackHCenter"
import ProfileImageProfileScreen from "../ProfileScreen/ProfileImageProfileScreen/ProfileImageProfileScreen"
import { usePickProfileImage } from "../ProfileScreen/ProfileImageProfileScreen/usePickProfileImage/usePickProfileImage"

const EditProfileScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<ProfileScreenTypes, "EditProfile">) => {
  const { lightBackground } = useMyColors()
  const authUser = useAuthStore((s) => s.authUser)

  const openImagePickerAsync = usePickProfileImage(authUser!.id)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfilePutDto>({
    defaultValues: {
      bio: route.params.initialValues.bio,
      name: route.params.initialValues.fullName,
      username: authUser!.username,
      website: route.params.initialValues.websiteUrl,
    },
  })

  const { mutate: submitUpdateProfile, isLoading } = useUpdateProfileMutation()

  const theme = useTheme()

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit profile",
      headerRight: () => (
        <IconButton
          onPress={() =>
            submitUpdateProfile(watch(), {
              onSuccess: () => {
                navigation.goBack()
              },
            })
          }
        >
          <Ionicons
            name="md-checkmark"
            size={24}
            color={theme.colors.primary[500]}
          />
        </IconButton>
      ),
    })
  })

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Pressable onPress={() => openImagePickerAsync("gallery")}>
          <VStackHCenter mt={6}>
            <VStackHCenter space={2}>
              <ProfileImageProfileScreen userId={authUser!.id} />
              <Text color="primary.500">Change profile image</Text>
            </VStackHCenter>
          </VStackHCenter>
        </Pressable>

        <VStackHCenter px={8} space={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="name"
            />
            <FormControl.ErrorMessage>
              {errors.username?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.username}>
            <FormControl.Label>Username</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="username"
            />
            <FormControl.ErrorMessage>
              {errors.name?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.bio}>
            <FormControl.Label>Bio</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  multiline
                  minHeight={16}
                />
              )}
              name="bio"
            />
            <FormControl.ErrorMessage>
              {errors.bio?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.website}>
            <FormControl.Label>Website</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="website"
            />
            <FormControl.ErrorMessage>
              {errors.website?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStackHCenter>

        {isLoading && (
          <VStackHCenter mt={4}>
            <Spinner />
          </VStackHCenter>
        )}
      </ScrollView>
    </VStack>
  )
}

export default EditProfileScreen
