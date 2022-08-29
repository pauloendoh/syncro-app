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
import { Button, Flex, Pressable, Text } from "native-base";
import React, { useMemo } from "react";
import { View } from "react-native";
import shallow from "zustand/shallow";
import { useClothingsQuery } from "../../hooks/react-query/clothing/useClothingsQuery";
import { useCurrentWeatherQuery } from "../../hooks/react-query/useCurrentWeatherQuery";
import useHomeFilterStore from "../../hooks/zustand/useHomeFilterStore";
import { ClothingGetDto } from "../../types/domain/clothing/ClothingGetDto";
import { urls } from "../../utils/urls";
import ClothingThumbnail from "./ClothingThumbnail/ClothingThumbnail";

interface Props {
  test?: string;
  onPressClothing: (clothing: ClothingGetDto) => void;
}

const MyImagePicker = (props: Props) => {
  const { data: clothings } = useClothingsQuery();
  const queryClient = useQueryClient();

  let openImagePickerAsync = async (type: "gallery" | "camera") => {
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

  const [filteringByCurrWeather, minRating, tagId] = useHomeFilterStore(
    (s) => [s.filteringByCurrWeather, s.minRating, s.tagId],
    shallow
  );

  const { data: currWeather } = useCurrentWeatherQuery();

  const filteredImages = useMemo(() => {
    if (!clothings) return [];

    let result = [...clothings];

    if (
      filteringByCurrWeather &&
      clothings.length > 0 &&
      currWeather?.temperature
    ) {
      result = clothings.filter((c) => {
        const { temperature } = currWeather;
        return c.minDegree < temperature && temperature < c.maxDegree;
      });
    }

    if (minRating) result = result.filter((r) => Number(r.rating) >= minRating);

    if (tagId) result = result.filter((r) => r.tagId === tagId);

    return result;
  }, [filteringByCurrWeather, clothings, currWeather, minRating, tagId]);

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
        {filteredImages.map((clothing) => (
          <Pressable
            key={clothing.id}
            style={{ width: "33.333%" }}
            onPress={() => props.onPressClothing(clothing)}
          >
            <ClothingThumbnail clothing={clothing} />
          </Pressable>
        ))}
      </Flex>

      <Text>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <Button onPress={() => openImagePickerAsync("gallery")}>Gallery</Button>
      <Button onPress={() => openImagePickerAsync("camera")}>Camera</Button>
    </View>
  );
};

export default MyImagePicker;
