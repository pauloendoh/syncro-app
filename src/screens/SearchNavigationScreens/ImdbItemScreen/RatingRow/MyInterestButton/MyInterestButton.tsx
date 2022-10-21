import { FontAwesome5 } from "@expo/vector-icons"

import { Text, useTheme } from "native-base"
import React, { useMemo } from "react"
import { Pressable } from "react-native"
import { getShortLabelByInterestValue } from "../../../../../components/modals/InterestModal/getLabelByInterestValue"
import { useMyInterestsQuery } from "../../../../../hooks/react-query/interest/useMyInterestsQuery"
import useInterestModalStore from "../../../../../hooks/zustand/modals/useInterestModalStore"
import { buildInterestDto } from "../../../../../types/domain/interest/InterestDto"
import VStackHCenter from "../../../../_common/flexboxes/VStackHCenter"

interface Props {
  itemId: string
}

const MyInterestButton = (props: Props) => {
  const { data: myRatings } = useMyInterestsQuery()

  const openModal = useInterestModalStore((s) => s.openModal)

  const savedInterest = useMemo(
    () => myRatings?.find((r) => r.imdbItemId === props.itemId),
    [props.itemId, myRatings]
  )

  const currentInterestLevel = useMemo(
    () => savedInterest?.interestLevel || 0,
    [savedInterest]
  )

  const theme = useTheme()

  return (
    <Pressable
      onPress={() =>
        openModal(
          savedInterest || buildInterestDto({ imdbItemId: props.itemId })
        )
      }
    >
      <VStackHCenter alignItems={"center"}>
        <FontAwesome5
          name={"fire"}
          color={
            currentInterestLevel > 0
              ? theme.colors.secondary[600]
              : theme.colors.light[100]
          }
          ks
          size={32}
        />

        <Text
          color={
            currentInterestLevel > 0 ? theme.colors.secondary[600] : undefined
          }
        >
          {currentInterestLevel > 0
            ? `${currentInterestLevel}/3`
            : "Add to interest list"}
        </Text>

        {currentInterestLevel > 0 && (
          <Text color={theme.colors.secondary[600]}>
            {getShortLabelByInterestValue(currentInterestLevel)}
          </Text>
        )}
      </VStackHCenter>
    </Pressable>
  )
}

export default MyInterestButton
