import Entypo from "@expo/vector-icons/Entypo";
import { Box, Center, Flex, Text, VStack } from "native-base";
import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { useTagIdQueryUtils } from "../../../hooks/react-query/tag/useTagIdQueryUtils";
import { useCurrentWeatherQuery } from "../../../hooks/react-query/useCurrentWeatherQuery";
import { ClothingGetDto } from "../../../types/domain/clothing/ClothingGetDto";
import { formatDegreeCelcius } from "../../../utils/text/formatDegreeCelcius";

interface Props {
  clothing: ClothingGetDto;
}

const ClothingThumbnail = ({ clothing }: Props) => {
  const tag = useTagIdQueryUtils(clothing.tagId);
  const { data } = useCurrentWeatherQuery();

  const isInCurrWeather = useMemo(() => {
    if (!data) return false;
    return (
      clothing.minDegree < data.temperature &&
      data.temperature < clothing.maxDegree
    );
  }, [data?.temperature]);

  return (
    <Box style={{ position: "relative" }}>
      <Image
        source={{ uri: clothing.imgUrl }}
        style={{ width: "100%", aspectRatio: 1 }}
      />

      <VStack
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          alignItems: "flex-end",
        }}
      >
        {clothing.rating && (
          <Center style={{ ...styles.chip }}>
            <Text style={{ ...styles.chipText, color: "orange" }}>
              {clothing.rating}
            </Text>
            <Entypo name="star" color="orange" size={12} />
          </Center>
        )}

        <Flex style={styles.chip}>
          <Text
            style={{
              ...styles.chipText,
              fontWeight: isInCurrWeather ? "bold" : "normal",
            }}
          >
            {clothing.minDegree} - {formatDegreeCelcius(clothing.maxDegree)}
          </Text>
        </Flex>

        {tag ? (
          <Center>
            <Flex style={styles.chip}>
              <Text style={styles.chipText}>{tag.name}</Text>
            </Flex>
          </Center>
        ) : (
          <Center minHeight="26px"></Center>
        )}
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#151515",
    opacity: 0.75,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginRight: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    justifyContent: "center",
  },
  chipText: {
    fontSize: 10,
    color: "white",
  },
});

export default ClothingThumbnail;
