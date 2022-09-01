import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VStack } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import MyImagePicker from "../../components/MyImagePicker/MyImagePicker";
import { StackParamType } from "../../types/StackParamType";
import { myColors } from "../../utils/myColors";
import HomeFooter from "./HomeFooter/HomeFooter";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<StackParamType, "Home">) => {
  return (
    <VStack flex="1" backgroundColor={myColors.background}>
      <ScrollView>
        <MyImagePicker
          onPressClothing={(clothing) =>
            navigation.navigate("Clothing", { clothing })
          }
        />
      </ScrollView>
      <HomeFooter />
    </VStack>
  );
};

export default HomeScreen;
