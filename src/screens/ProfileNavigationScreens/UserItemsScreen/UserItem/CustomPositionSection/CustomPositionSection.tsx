import { Input, Spinner, Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import useChangeCustomPositionMutation from "../../../../../hooks/react-query/custom-position/useChangeCustomPositionMutation"
import { useCustomPositionsQuery } from "../../../../../hooks/react-query/custom-position/useCustomPositionsQuery"
import { useUserItemsQuery } from "../../../../../hooks/react-query/user/useUserItemsQuery"
import useAuthStore from "../../../../../hooks/zustand/useAuthStore"
import { buildCustomPositionDto } from "../../../../../types/domain/custom-position/CustomPositionDto"
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

  const handleSubmit = () => {
    const position = parseInt(input)
    if (isNaN(position) || position < 1 || position > itemsCount) {
      setInput(currentPositionLabel)
      return
    }

    if (!currentPosition) {
      submitChangePosition({
        itemType: props.itemType,
        dto: {
          ...buildCustomPositionDto({
            imdbItemId: props.itemId,
            userId: authUser!.id,
            position,
          }),
        },
      })
      return
    }

    submitChangePosition({
      itemType: props.itemType,
      dto: {
        ...currentPosition,
        position,
      },
    })
  }

  /////
  if (isLoading) return <Spinner />
  return (
    <VStack>
      <Text>Position</Text>
      <Input
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
      />
    </VStack>
  )
}

export default CustomPositionSection
