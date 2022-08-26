import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { FileSystemUploadType, uploadAsync } from "expo-file-system";
import {
  ImageInfo,
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Button, Flex, Pressable, Text } from "native-base";
import React from "react";
import { Image, View } from "react-native";
import { useClothingsQuery } from "../../hooks/react-query/clothing/useClothingsQuery";
import { ClothingDto } from "../../types/domain/clothing/ClothingDto";
import { urls } from "../../utils/urls";

interface Props {
  test?: string;
  onPressClothing: (clothing: ClothingDto) => void;
}

const MyImagePicker = (props: Props) => {
  const { data: clothings } = useClothingsQuery();
  const queryClient = useQueryClient();

  let openImagePickerAsync = async () => {
    let permissionResult = await requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await launchImageLibraryAsync({ aspect: [1, 1] });
    console.log(pickerResult);
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

      const clothing: ClothingDto = JSON.parse(result.body);

      queryClient.setQueryData<ClothingDto[]>(
        [urls.api.clothings],
        (currClothings) => {
          if (!currClothings) return [clothing];
          return [...currClothings, clothing];
        }
      );
    }
  };

  return (
    <View>
      <Flex
        style={{
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          alignContent: "flex-start",
        }}
      >
        {clothings?.map((clothing) => (
          <Pressable
            key={clothing.id}
            style={{ width: "33.333%" }}
            onPress={() => props.onPressClothing(clothing)}
          >
            <Image
              source={{ uri: clothing.imgUrl }}
              style={{ width: "100%", aspectRatio: 1 }}
            />
          </Pressable>
        ))}
      </Flex>

      <Text>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <Button onPress={openImagePickerAsync}>Pick a photo</Button>
    </View>
  );
};

export default MyImagePicker;
