import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Text } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import HStackVCenter from "../../../../_common/flexboxes/FlexVCenter";

interface Props {
  onDelete: () => void;
}

const TagModalMenu = (props: Props) => {
  return (
    <Menu
      placement="bottom right"
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <MaterialIcons name="more-horiz" size={24} color="black" />
          </Pressable>
        );
      }}
    >
      <Menu.Item onPress={props.onDelete}>
        <HStackVCenter space="2">
          <MaterialIcons name="delete-forever" size={24} color="black" />
          <Text>Delete</Text>
        </HStackVCenter>
      </Menu.Item>
    </Menu>
  );
};

export default TagModalMenu;
