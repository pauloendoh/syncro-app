import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Text } from "native-base";
import React from "react";
import MyImagePicker from "../../components/MyImagePicker/MyImagePicker";
import { useLogout } from "../../hooks/domain/auth/useLogout";
import useAuthStore from "../../hooks/zustand/useAuthStore";
import { StackParamType } from "../../types/StackParamType";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamType, "Home">) => {
  const authUser = useAuthStore((s) => s.authUser);

  const logout = useLogout();

  return (
    <Box>
      <Text>Home</Text>
      <Text>{authUser?.username}</Text>

      <Button onPress={logout}>Logout</Button>
      <MyImagePicker
        onPressClothing={(clothing) =>
          navigation.navigate("Clothing", { clothing })
        }
      />
    </Box>
  );
};

export default HomeScreen;
