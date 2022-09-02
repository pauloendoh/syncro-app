import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import useUpdateClothingMutation from "../../hooks/react-query/clothing/useUpdateClothingMutation";
import { useCurrentWeatherQuery } from "../../hooks/react-query/useCurrentWeatherQuery";
import useDebounce from "../../hooks/useDebounce";
import { StackParamType } from "../../types/StackParamType";
import { formatDegreeCelcius } from "../../utils/text/formatDegreeCelcius";
import TagSelector from "../_common/TagSelector/TagSelector";

const ClothingScreen = ({
  route: {
    params: { clothing },
  },
}: NativeStackScreenProps<StackParamType, "Clothing">) => {
  const [localValue, setLocalValue] = useState(clothing);
  const [hasChanged, setHasChanged] = useState(false);

  const debouncedValue = useDebounce(localValue, 250);

  const weatherRes = useCurrentWeatherQuery();

  const { mutate: requestUpdate } = useUpdateClothingMutation();
  useEffect(() => {
    if (hasChanged) {
      requestUpdate(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setLocalValue(clothing);
    setHasChanged(false);
  }, [clothing]);

  useEffect(() => {
    if (JSON.stringify(localValue) !== JSON.stringify(clothing))
      setHasChanged(true);
  }, [localValue]);

  const handleChangeDegree = (
    value: string,
    type: "minDegree" | "maxDegree"
  ) => {
    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setLocalValue((curr) => ({
      ...curr,
      minDegree: type === "minDegree" ? numValue : curr.minDegree,
      maxDegree: type === "maxDegree" ? numValue : curr.maxDegree,
    }));
  };

  const handleChangeRating = (ratingValue: number) => {
    if (ratingValue === localValue.rating) {
      setLocalValue((curr) => ({ ...curr, rating: null }));
      return;
    }

    setLocalValue((curr) => ({ ...curr, rating: ratingValue }));
  };

  return (
    <ScrollView style={{ flex: 1 }} backgroundColor="light.900">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <Box>
          <Image
            source={{ uri: localValue.imgUrl }}
            style={{ width: "100%", aspectRatio: 1 }}
          />

          <VStack flex="1" px={4} mt={4} space={4}>
            <HStack space={4}>
              <FormControl style={{ width: 100 }}>
                <FormControl.Label>Min degree</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  value={String(localValue.minDegree)}
                  onChangeText={(text) => handleChangeDegree(text, "minDegree")}
                />
              </FormControl>

              <FormControl style={{ width: 100 }}>
                <FormControl.Label>Max degree</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  value={String(localValue.maxDegree)}
                  onChangeText={(text) => handleChangeDegree(text, "maxDegree")}
                />
              </FormControl>

              <VStack marginTop={1} space={3.5}>
                <Text>Current degree</Text>
                <Text>
                  {formatDegreeCelcius(weatherRes?.data?.temperature)}
                </Text>
              </VStack>
            </HStack>

            <VStack space={1} alignItems="flex-start">
              <Text>Rating</Text>
              <AirbnbRating
                showRating={false}
                onFinishRating={handleChangeRating}
                size={16}
                defaultRating={Number(localValue.rating)}
              />
            </VStack>

            <HStack alignItems="flex-end" space="2">
              <TagSelector
                selectedTagId={localValue.tagId}
                onChange={(tagId) =>
                  setLocalValue((curr) => ({ ...curr, tagId: tagId }))
                }
              />
            </HStack>
          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ClothingScreen;
