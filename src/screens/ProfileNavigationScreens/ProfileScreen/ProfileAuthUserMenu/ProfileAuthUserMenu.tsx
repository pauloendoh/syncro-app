import { HamburgerIcon, IconButton, Menu } from "native-base"
import React from "react"
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
          <IconButton
            size="sm"
            accessibilityLabel="More options menu"
            {...triggerProps}
          >
            <HamburgerIcon />
          </IconButton>
        )
      }}
    >
      <Menu.Item onPress={logout}>Logout</Menu.Item>
    </Menu>
  )
}

export default ProfileAuthUserMenu
