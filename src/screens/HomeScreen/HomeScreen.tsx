import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Flex, Text } from "native-base";
import React from "react";
import MyImagePicker from "../../components/MyImagePicker/MyImagePicker";
import { useLogout } from "../../hooks/domain/auth/useLogout";
import { StackParamType } from "../../types/StackParamType";
import FilterRow from "./FilterRow/FilterRow";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamType, "Home">) => {
  const logout = useLogout();

  return (
    <Box>
      <Button onPress={logout}>Logout</Button>
      <Flex style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text>Home</Text>
      </Flex>

      <FilterRow />

      <MyImagePicker
        onPressClothing={(clothing) =>
          navigation.navigate("Clothing", { clothing })
        }
      />
    </Box>
  );
};

export default HomeScreen;
