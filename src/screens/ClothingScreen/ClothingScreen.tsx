import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import useDeleteClothingMutation from "../../hooks/react-query/clothing/useDeleteClothingMutation";
import useUpdateClothingMutation from "../../hooks/react-query/clothing/useUpdateClothingMutation";
import { useCurrentWeatherQuery } from "../../hooks/react-query/useCurrentWeatherQuery";
import useDebounce from "../../hooks/useDebounce";
import { StackParamType } from "../../types/StackParamType";
import TagSelector from "../_common/TagSelector/TagSelector";
import AddTagButton from "./AddTagButton/AddTagButton";

const ClothingScreen = ({
  route: {
    params: { clothing },
  },
  navigation,
}: NativeStackScreenProps<StackParamType, "Clothing">) => {
  const { mutate } = useDeleteClothingMutation();

  const [localValue, setLocalValue] = useState(clothing);
  const [hasChanged, setHasChanged] = useState(false);

  const debouncedValue = useDebounce(localValue, 250);

  const weatherRes = useCurrentWeatherQuery();

  const { mutate: requestUpdate } = useUpdateClothingMutation();
  const toast = useToast();
  useEffect(() => {
    if (hasChanged) {
      requestUpdate(debouncedValue, {
        onSuccess: () => {
          toast.show({ description: "Saved" });
        },
      });
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

  const handleDelete = () => {
    Alert.alert("Delete clothing", "Confirm delete?", [
      {
        text: "Ok",
        onPress: () => {
          mutate(localValue, {
            onSuccess: () => {
              navigation.navigate("Home");
            },
          });
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <Box>
          <Image
            source={{ uri: localValue.imgUrl }}
            style={{ width: "100%", aspectRatio: 1 }}
          />

          <Flex style={{ flexDirection: "row" }}>
            <FormControl style={{ width: 100, marginRight: 16 }}>
              <FormControl.Label>Min degree</FormControl.Label>
              <Input
                value={String(localValue.minDegree)}
                onChangeText={(text) => handleChangeDegree(text, "minDegree")}
              />
            </FormControl>

            <FormControl style={{ width: 100 }}>
              <FormControl.Label>Max degree</FormControl.Label>
              <Input
                value={String(localValue.maxDegree)}
                onChangeText={(text) => handleChangeDegree(text, "maxDegree")}
              />
            </FormControl>

            <Box>{weatherRes && weatherRes?.data?.temperature}</Box>
          </Flex>

          <AirbnbRating
            showRating={false}
            onFinishRating={handleChangeRating}
            defaultRating={Number(localValue.rating)}
          />

          <VStack space="2">
            <TagSelector
              selectedTagId={localValue.tagId}
              onChange={(tagId) =>
                setLocalValue((curr) => ({ ...curr, tagId: tagId }))
              }
            />
            <AddTagButton />
            <Button
              onPress={handleDelete}
              colorScheme="error"
              onLongPress={() => alert("hey")}
            >
              Delete
            </Button>
          </VStack>
        </Box>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ClothingScreen;
