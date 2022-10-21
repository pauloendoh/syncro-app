import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, Text, useTheme } from "native-base"
import React from "react"
import { useLogout } from "../../../../hooks/domain/auth/useLogout"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"

interface Props {
  test?: string
}

const HomeFooter = (props: Props) => {
  const logout = useLogout()

  const theme = useTheme()

  return (
    <HStackVCenter
      backgroundColor="light.900"
      justifyContent="space-evenly"
      height="64px"
    >
      <Pressable onPress={logout}>
        <HStackVCenter space="2" flex="1">
          <MaterialIcons
            name="logout"
            size={24}
            color={theme.colors.dark[900]}
          />
          <Text>Logout</Text>
        </HStackVCenter>
      </Pressable>
    </HStackVCenter>
  )
}

export default HomeFooter
