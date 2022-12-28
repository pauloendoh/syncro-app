import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "native-base"
import React from "react"
import { SyncroItemType } from "./SyncroItemType"

interface Props {
  type: SyncroItemType
  color?: string
  size?: number
}

const SyncroItemIcon = (props: Props) => {
  const { colors } = useTheme()

  const { type, color = colors.text[100], size = 24 } = props

  if (type === "tvSeries")
    return <Feather name="tv" size={size} color={color} />

  if (type === "game")
    return <Ionicons name="md-game-controller" size={size} color={color} />

  if (type === "movie") return <Feather name="film" size={size} color={color} />

  return (
    <MaterialCommunityIcons
      name="book-open-blank-variant"
      size={size}
      color={color}
    />
  )
}

export default SyncroItemIcon
