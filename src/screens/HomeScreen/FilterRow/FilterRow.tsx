import { Switch } from "react-native";

import { HStack, Text } from "native-base";
import React from "react";
import shallow from "zustand/shallow";
import { useCurrentWeatherQuery } from "../../../hooks/react-query/useCurrentWeatherQuery";
import useHomeFilterStore from "../../../hooks/zustand/useHomeFilterStore";
import TagSelector from "../../shared/TagSelector/TagSelector";
import MinRatingButton from "./MinRatingButton/MinRatingButton";

const FilterRow = () => {
  const { data: currentWeather } = useCurrentWeatherQuery();

  const [
    filteringByCurrWeather,
    setFilteringByCurrWeather,
    tagId,
    setTagId,
  ] = useHomeFilterStore(
    (s) => [
      s.filteringByCurrWeather,
      s.setFilteringByCurrWeather,
      s.tagId,
      s.setTagId,
    ],
    shallow
  );

  return (
    <HStack
      justifyContent={"space-between"}
      alignItems="center"
      paddingRight="4"
    >
      <TagSelector selectedTagId={tagId} onChange={setTagId} />

      <HStack justifyContent={"space-between"} alignItems="center">
        <MinRatingButton />

        <HStack alignItems="center">
          <Switch
            value={filteringByCurrWeather}
            onValueChange={() => {
              setFilteringByCurrWeather(!filteringByCurrWeather);
            }}
          />
          <Text>Auto ({currentWeather?.temperature || "?"}°C)</Text>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default FilterRow;
