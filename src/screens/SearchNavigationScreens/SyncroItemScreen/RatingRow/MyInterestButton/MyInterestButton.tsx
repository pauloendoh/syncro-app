import { MaterialCommunityIcons } from "@expo/vector-icons"

import { Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import useToggleSaveItemMutation from "../../../../../hooks/react-query/interest/useToggleSaveItemMutation"
import useSaveItemModalStore from "../../../../../hooks/zustand/modals/useSaveItemModalStore"
import VStackHCenter from "../../../../_common/flexboxes/VStackHCenter"

interface Props {
  itemId: string
}

const MyInterestButton = (props: Props) => {
  const { data: myRatings } = useMyInterestsQuery()

  const openModal = useSaveItemModalStore((s) => s.openModal)

  const savedInterest = useMemo(
    () => myRatings?.find((r) => r.syncroItemId === props.itemId),
    [props.itemId, myRatings]
  )

  const currentInterestLevel = useMemo(
    () => savedInterest?.interestLevel || 0,
    [savedInterest]
  )

  const theme = useTheme()

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  return (
    <Pressable onPress={() => submitToggleSave(props.itemId)}>
      <VStackHCenter alignItems={"center"}>
        <MaterialCommunityIcons
          name={
            currentInterestLevel > 0 ? "bookmark-check" : "bookmark-outline"
          }
          size={32}
          color={
            currentInterestLevel > 0
              ? theme.colors.secondary[500]
              : theme.colors.light[100]
          }
        />

        <Text
          textAlign={"center"}
          color={
            currentInterestLevel > 0 ? theme.colors.secondary[500] : undefined
          }
        >
          {currentInterestLevel > 0 ? "Saved" : "Save item"}
        </Text>
      </VStackHCenter>
    </Pressable>
  )
}

export default MyInterestButton
