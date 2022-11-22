import { HamburgerIcon, IconButton, Menu } from "native-base"
import React from "react"
import { Linking } from "react-native"
import useRecommendItemActionSheetStore from "../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import { urls } from "../../../../utils/urls"

interface Props {
  imdbItemId: string
}

const ImdbItemMenu = (props: Props) => {
  const openImdbLink = () => {
    Linking.canOpenURL(urls.others.imdbItem(props.imdbItemId)).then(
      (supported) => {
        if (!supported) {
          return
        }
        Linking.openURL(urls.others.imdbItem(props.imdbItemId))
      }
    )
  }

  const openActionSheet = useRecommendItemActionSheetStore(
    (s) => s.openActionSheet
  )

  return (
    <Menu
      w="220"
      shouldOverlapWithTrigger={false}
      trigger={(triggerProps) => {
        return (
          <IconButton size={"sm"} {...triggerProps}>
            <HamburgerIcon />
          </IconButton>
        )
      }}
    >
      <Menu.Item onPress={openImdbLink}>Open on IMDB</Menu.Item>
      <Menu.Item onPress={() => openActionSheet(props.imdbItemId)}>
        Recommend to mutual
      </Menu.Item>
    </Menu>
  )
}

export default ImdbItemMenu
