import { HamburgerIcon, IconButton, Menu } from "native-base"
import React from "react"
import { Linking } from "react-native"
import { urls } from "../../../../utils/urls"

interface Props {
  imdbItemId: string
}

const ImdbItemMenu = (props: Props) => {
  const openImdbLink = () => {
    Linking.canOpenURL(urls.others.imdbItem(props.imdbItemId)).then(
      (supported) => {
        debugger
        if (!supported) {
          return
        }
        Linking.openURL(urls.others.imdbItem(props.imdbItemId))
      }
    )
  }

  return (
    <Menu
      w="190"
      shouldOverlapWithTrigger={false}
      placement="bottom right"
      trigger={(triggerProps) => {
        return (
          <IconButton size={"sm"} {...triggerProps}>
            <HamburgerIcon />
          </IconButton>
        )
      }}
    >
      <Menu.Item onPress={openImdbLink}>Open on IMDB</Menu.Item>
    </Menu>
  )
}

export default ImdbItemMenu
