import { Menu, Pressable, Text } from "native-base";
import React from "react";
import { AirbnbRating } from "react-native-ratings";
import shallow from "zustand/shallow";
import useHomeFilterStore from "../../../../hooks/zustand/useHomeFilterStore";
import HStackVCenter from "../../../_common/flexboxes/FlexVCenter";

interface Props {
  test?: string;
}

const MinRatingButton = (props: Props) => {
  const [minRating, setMinRating] = useHomeFilterStore(
    (s) => [s.minRating, s.setMinRating],
    shallow
  );

  const handleChangeRating = (newRating: number) => {
    if (newRating === minRating) {
      setMinRating(null);
      return;
    }

    setMinRating(newRating);
  };

  return (
    <Menu
      w="148"
      shouldOverlapWithTrigger={false}
      offset={44}
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HStackVCenter flex="1">
              <Text>Min Rating {minRating || "-"}</Text>
            </HStackVCenter>
          </Pressable>
        );
      }}
    >
      <Menu.Item>
        <AirbnbRating
          showRating={false}
          onFinishRating={handleChangeRating}
          defaultRating={Number(minRating)}
          size={20}
        />
      </Menu.Item>
    </Menu>
  );
};

export default MinRatingButton;
