import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HStack, Text } from "native-base";
import React from "react";
import { Alert, Pressable } from "react-native";
import useDeleteClothingMutation from "../../../hooks/react-query/clothing/useDeleteClothingMutation";
import { StackParamType } from "../../../types/StackParamType";

type Props = NativeStackScreenProps<StackParamType, "Clothing">;

const ClothingTitle = (props: Props) => {
  const { mutate } = useDeleteClothingMutation();

  const handleDelete = () => {
    Alert.alert("Delete clothing", "Confirm delete?", [
      {
        text: "Ok",
        onPress: () => {
          mutate(props.route.params.clothing, {
            onSuccess: () => {
              props.navigation.navigate("Home");
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
    <HStack
      flex="1"
      paddingRight="96px"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Pressable onPress={handleDelete}>
        <HStack flex="1">
          <Text color="red.500" fontSize="lg" fontWeight="semibold">
            Delete
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default ClothingTitle;
