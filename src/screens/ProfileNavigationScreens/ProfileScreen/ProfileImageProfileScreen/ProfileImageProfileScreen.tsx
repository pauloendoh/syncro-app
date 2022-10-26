import * as ImageManipulator from "expo-image-manipulator"

import { FileSystemUploadType, uploadAsync } from "expo-file-system"

import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  ImageInfo,
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker"

import { Image } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useMyToast } from "../../../../components/toasts/useMyToast"
import { useUserInfoQuery } from "../../../../hooks/react-query/user/useUserInfoQuery"
import useAuthStore from "../../../../hooks/zustand/useAuthStore"
import { urls } from "../../../../utils/urls"

interface Props {
  userId: string
}

const ProfileImageProfileScreen = (props: Props) => {
  const { showSuccessToast, showErrorToast } = useMyToast()

  const openImagePickerAsync = async (type: "gallery" | "camera") => {
    let permissionResult =
      type === "gallery"
        ? await requestMediaLibraryPermissionsAsync()
        : await requestCameraPermissionsAsync()

    if (permissionResult.granted === false) {
      alert(`Permission to access ${type} required!`)
      return
    }

    const options: ImagePickerOptions = {
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    }

    let pickerResult =
      type === "gallery"
        ? await launchImageLibraryAsync(options)
        : await launchCameraAsync(options)

    if (!pickerResult.cancelled) {
      const { uri } = pickerResult as ImageInfo
      // setImages((current) => [...current, uri]);

      const userStr = String(await AsyncStorage.getItem("user"))

      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { height: 300, width: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      )

      try {
        const result = await uploadAsync(
          urls.api.profilePicture,
          manipResult.uri,
          {
            fieldName: "file",
            httpMethod: "PUT",
            uploadType: FileSystemUploadType.MULTIPART,
            headers: {
              authorization: JSON.parse(userStr).token,
            },
          }
        )

        refetchUserInfo()
        showSuccessToast("Image uploaded!")
      } catch (err) {
        if (err instanceof Error) showErrorToast(err?.message)
      }
    }
  }

  const authUser = useAuthStore((s) => s.authUser)

  const { data: userInfo, refetch: refetchUserInfo } = useUserInfoQuery(
    props.userId
  )

  return (
    <Pressable
      onPress={() => {
        if (props.userId === authUser?.id) openImagePickerAsync("gallery")
      }}
    >
      <Image
        alt="profile-picture"
        src={
          userInfo?.profile?.pictureUrl ||
          "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
        }
        height="80px"
        width="80px"
        style={{ borderRadius: 100 }}
      />
    </Pressable>
  )
}

export default ProfileImageProfileScreen
