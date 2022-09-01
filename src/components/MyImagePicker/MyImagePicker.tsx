import { Flex, HStack, Pressable, Spinner } from "native-base";
import React, { useMemo } from "react";
import { View } from "react-native";
import shallow from "zustand/shallow";
import { useClothingsQuery } from "../../hooks/react-query/clothing/useClothingsQuery";
import { useCurrentWeatherQuery } from "../../hooks/react-query/useCurrentWeatherQuery";
import useHomeFilterStore from "../../hooks/zustand/useHomeFilterStore";
import { ClothingGetDto } from "../../types/domain/clothing/ClothingGetDto";
import ClothingThumbnail from "./ClothingThumbnail/ClothingThumbnail";

interface Props {
  test?: string;
  onPressClothing: (clothing: ClothingGetDto) => void;
}

const MyImagePicker = (props: Props) => {
  const {
    data: clothings,
    isLoading: isLoadingClothings,
  } = useClothingsQuery();

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
        {isLoadingClothings && (
          <HStack justifyContent="center" marginTop="4" flex="1">
            <Spinner size="lg" />
          </HStack>
        )}
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
    </View>
  );
};

export default MyImagePicker;
