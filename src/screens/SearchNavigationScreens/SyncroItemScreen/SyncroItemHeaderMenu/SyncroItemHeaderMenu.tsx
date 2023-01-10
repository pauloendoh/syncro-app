import { HamburgerIcon, IconButton, Menu } from "native-base"
import React from "react"
import useUpdateItemAvgRatingMutation from "../../../../hooks/react-query/syncro-item/useUpdateItemAvgRatingMutation"
import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"

interface Props {
  syncroItem: SyncroItemDto
}

const SyncroItemHeaderMenu = ({ syncroItem }: Props) => {
  const { mutate: submitUpdateItemAvgRating } = useUpdateItemAvgRatingMutation()

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
      <Menu.Item onPress={() => submitUpdateItemAvgRating(syncroItem.id)}>
        Update Rating
      </Menu.Item>
    </Menu>
  )
}

export default SyncroItemHeaderMenu
