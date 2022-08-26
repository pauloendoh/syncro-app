import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button } from "native-base";
import React from "react";
import { Alert, Image } from "react-native";
import useDeleteClothingMutation from "../../hooks/react-query/clothing/useDeleteClothingMutation";
import { StackParamType } from "../../types/StackParamType";

const ClothingScreen = ({
  route: {
    params: { clothing },
  },
  navigation,
}: NativeStackScreenProps<StackParamType, "Clothing">) => {
  const { mutate } = useDeleteClothingMutation();
  const handleDelete = () => {
    Alert.alert("Delete clothing", "Confirm delete?", [
      {
        text: "Ok",
        onPress: () => {
          mutate(clothing, {
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
    <Box>
      <Image
        source={{ uri: clothing.imgUrl }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <Button onPress={handleDelete}>Delete</Button>
    </Box>
  );
};

export default ClothingScreen;
