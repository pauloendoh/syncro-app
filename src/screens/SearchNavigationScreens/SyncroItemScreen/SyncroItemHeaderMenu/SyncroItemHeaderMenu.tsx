import { HamburgerIcon, IconButton, Menu } from "native-base"
import React, { useMemo } from "react"
import { Linking } from "react-native"
import useRecommendItemActionSheetStore from "../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { urls } from "../../../../utils/urls"

interface Props {
  syncroItem: SyncroItemDto
}

const SyncroItemHeaderMenu = ({ syncroItem }: Props) => {
  const openExternalLink = () => {
    Linking.canOpenURL(urls.others.imdbItem(syncroItem.id)).then(
      (supported) => {
        if (!supported) {
          return
        }

        // PE 1/3 - dry
        if (syncroItem.type === "game") {
          if (!syncroItem.igdbUrl) {
            alert("No external link available")
            return
          }
          Linking.openURL(syncroItem.igdbUrl)
          return
        }
        if (syncroItem.type === "manga") {
          if (!syncroItem.mangaMalUrl) {
            alert("No external link available")
            return
          }
          Linking.openURL(syncroItem.mangaMalUrl)
          return
        }

        Linking.openURL(urls.others.imdbItem(syncroItem.id))
      }
    )
  }

  const openActionSheet = useRecommendItemActionSheetStore(
    (s) => s.openActionSheet
  )

  const linkLabel = useMemo(() => {
    if (syncroItem.type === "game") return "Open on IGDB"
    if (syncroItem.type === "manga") return "Open on MyAnimeList"
    return "Open on IMDB"
  }, [syncroItem.type])

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
      <Menu.Item onPress={openExternalLink}>{linkLabel}</Menu.Item>
      <Menu.Item onPress={() => openActionSheet(syncroItem.id)}>
        Recommend to mutual
      </Menu.Item>
    </Menu>
  )
}

export default SyncroItemHeaderMenu
