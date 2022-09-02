import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Text, useTheme } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import HStackVCenter from "../../../flexboxes/FlexVCenter";

interface Props {
  onDelete: () => void;
}

const TagModalMenu = (props: Props) => {
  const theme = useTheme();

  return (
    <Menu
      placement="bottom right"
      offset={32}
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <MaterialIcons
              name="more-horiz"
              size={24}
              color={theme.colors.dark[600]}
            />
          </Pressable>
        );
      }}
    >
      <Menu.Item onPress={props.onDelete}>
        <HStackVCenter space="2">
          <MaterialIcons
            name="delete-forever"
            size={24}
            color={theme.colors.dark[600]}
          />
          <Text>Delete</Text>
        </HStackVCenter>
      </Menu.Item>
    </Menu>
  );
};

export default TagModalMenu;
