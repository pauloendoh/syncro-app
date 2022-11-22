import { Select, Spinner, Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import useChangeCustomPositionMutation from "../../../../../hooks/react-query/custom-position/useChangeCustomPositionMutation"
import { useCustomPositionsQuery } from "../../../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserItemsQuery } from "../../../../../hooks/react-query/user/useUserItemsQuery"
import useAuthStore from "../../../../../hooks/zustand/useAuthStore"
import { SyncroItemType } from "../../../../../types/domain/SyncroItemType"

interface Props {
  itemType: SyncroItemType
  itemId: string
}

const CustomPositionSection = (props: Props) => {
  const { data: customPositions, isLoading } = useCustomPositionsQuery(
    props.itemType
  )
  const authUser = useAuthStore((s) => s.authUser)
  const { data: userItems } = useUserItemsQuery(authUser!.id, props.itemType)

  const itemsCount = useMemo(() => {
    if (!userItems) return 0
    return userItems.length
  }, [userItems, authUser])

  const currentPosition = useMemo(() => {
    if (!customPositions) return undefined

    const customPosition = customPositions.find(
      (p) => p.imdbItemId === props.itemId
    )
    return customPosition
  }, [customPositions, props.itemId])

  const currentPositionLabel = useMemo(() => {
    if (!currentPosition) return "?"

    return currentPosition?.position.toString() || "?"
  }, [currentPosition])

  const [input, setInput] = useState(currentPositionLabel)

  // after saving
  useEffect(() => {
    setInput(currentPositionLabel)
  }, [currentPositionLabel])

  const { mutate: submitChangePosition } = useChangeCustomPositionMutation()

  const handleSubmit = (newPosition: string) => {
    if (!currentPosition) return
    submitChangePosition(
      {
        itemType: props.itemType,
        dto: {
          ...currentPosition,
          position: Number(newPosition),
        },
      },
      {
        onSuccess: () => {
          setInput(newPosition)
        },
      }
    )
  }

  const options = useMemo(() => userItems?.map((u, index) => index + 1) || [], [
    userItems,
  ])

  /////
  if (isLoading) return <Spinner />
  return (
    <VStack>
      <Text>Position</Text>
      <Select
        selectedValue={input}
        width="72px"
        _actionSheetBody={{
          size: "xs",
        }}
        onValueChange={handleSubmit}
      >
        {options.map((option) => (
          <Select.Item
            key={option}
            label={String(option)}
            value={String(option)}
          />
        ))}
      </Select>
      {/* <Input
        width="40px"
        boxSize={"0.5"}
        onChangeText={(text) => {
          const number = parseInt(text)
          if (isNaN(number)) {
            setInput("")
            return
          }

          if (number > itemsCount) {
            setInput(itemsCount.toString())
            return
          }

          setInput(number.toString())
        }}
        value={input}
        onBlur={() => setInput(currentPositionLabel)}
        onSubmitEditing={handleSubmit}
        type="text"
        keyboardType="numeric"
      /> */}
    </VStack>
  )
}

export default CustomPositionSection
