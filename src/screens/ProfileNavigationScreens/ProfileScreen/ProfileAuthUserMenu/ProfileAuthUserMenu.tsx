import { HamburgerIcon, Menu } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useLogout } from "../../../../hooks/domain/auth/useLogout"

interface Props {
  test?: string
}

const ProfileAuthUserMenu = (props: Props) => {
  const logout = useLogout()

  return (
    <Menu
      w="190"
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>
        )
      }}
    >
      <Menu.Item onPress={logout}>Logout</Menu.Item>
    </Menu>
  )
}

export default ProfileAuthUserMenu
