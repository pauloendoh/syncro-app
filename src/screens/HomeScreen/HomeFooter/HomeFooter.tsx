import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { FileSystemUploadType, uploadAsync } from "expo-file-system";
import {
  ImageInfo,
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Pressable, Text, useTheme } from "native-base";
import React from "react";
import { useLogout } from "../../../hooks/domain/auth/useLogout";
import { ClothingGetDto } from "../../../types/domain/clothing/ClothingGetDto";
import { urls } from "../../../utils/urls";
import HStackVCenter from "../../_common/flexboxes/FlexVCenter";

interface Props {
  test?: string;
}

const HomeFooter = (props: Props) => {
  const logout = useLogout();

  const queryClient = useQueryClient();

  const openImagePickerAsync = async (type: "gallery" | "camera") => {
    let permissionResult =
      type === "gallery"
        ? await requestMediaLibraryPermissionsAsync()
        : await requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(`Permission to access ${type} required!`);
      return;
    }

    const options: ImagePickerOptions = {
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    };

    let pickerResult =
      type === "gallery"
        ? await launchImageLibraryAsync(options)
        : await launchCameraAsync(options);

    if (!pickerResult.cancelled) {
      const { uri } = pickerResult as ImageInfo;
      // setImages((current) => [...current, uri]);

      const userStr = String(await AsyncStorage.getItem("user"));

      const result = await uploadAsync(urls.api.clothings, uri, {
        fieldName: "image",
        httpMethod: "POST",
        uploadType: FileSystemUploadType.MULTIPART,
        headers: {
          authorization: JSON.parse(userStr).token,
        },
      });

      const clothing: ClothingGetDto = JSON.parse(result.body);

      queryClient.setQueryData<ClothingGetDto[]>(
        [urls.api.clothings],
        (currClothings) => {
          if (!currClothings) return [clothing];
          return [...currClothings, clothing];
        }
      );
    }
  };

  const theme = useTheme();

  return (
    <HStackVCenter
      backgroundColor="light.900"
      justifyContent="space-evenly"
      height="64px"
    >
      <Pressable onPress={() => openImagePickerAsync("camera")}>
        <HStackVCenter space="2" flex="1">
          <MaterialIcons
            name="camera-alt"
            size={24}
            color={theme.colors.dark[900]}
          />
          <Text>Camera</Text>
        </HStackVCenter>
      </Pressable>

      <Pressable onPress={() => openImagePickerAsync("gallery")}>
        <HStackVCenter space="2" flex="1">
          <MaterialIcons
            name="image-search"
            size={24}
            color={theme.colors.dark[900]}
          />
          <Text>Gallery</Text>
        </HStackVCenter>
      </Pressable>

      <Pressable onPress={logout}>
        <HStackVCenter space="2" flex="1">
          <MaterialIcons
            name="logout"
            size={24}
            color={theme.colors.dark[900]}
          />
          <Text>Logout</Text>
        </HStackVCenter>
      </Pressable>
    </HStackVCenter>
  );
};

export default HomeFooter;
