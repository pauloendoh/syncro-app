import { Pressable, Switch } from "react-native";

import { HStack, Text } from "native-base";
import React from "react";
import shallow from "zustand/shallow";
import { useCurrentWeatherQuery } from "../../../hooks/react-query/useCurrentWeatherQuery";
import useHomeFilterStore from "../../../hooks/zustand/useHomeFilterStore";
import HStackVCenter from "../../_common/flexboxes/FlexVCenter";
import TagSelector from "../../_common/TagSelector/TagSelector";
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
    <HStack justifyContent={"space-evenly"} alignItems="center" flex="1">
      <TagSelector
        selectedTagId={tagId}
        onChange={setTagId}
        noBorder
        width="112px"
      />

      <MinRatingButton />

      <HStackVCenter flex="1" justifyContent="center">
        <Pressable
          onPress={() => setFilteringByCurrWeather(!filteringByCurrWeather)}
        >
          <Text>Auto ({currentWeather?.temperature || "?"}°C)</Text>
        </Pressable>
        <Switch
          value={filteringByCurrWeather}
          onValueChange={() => {
            setFilteringByCurrWeather(!filteringByCurrWeather);
          }}
        />
      </HStackVCenter>
    </HStack>
  );
};

export default FilterRow;
