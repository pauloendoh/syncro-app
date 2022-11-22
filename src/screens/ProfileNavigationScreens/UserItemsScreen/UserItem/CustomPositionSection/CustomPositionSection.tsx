import { Select, Spinner, Text, VStack } from "native-base"
import React, { useMemo } from "react"
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

  const currentPosition = useMemo(
    () => customPositions?.find((p) => p.imdbItemId === props.itemId),
    [customPositions, props.itemId]
  )

  const currentPositionLabel = useMemo(() => {
    if (!currentPosition) return "?"

    return currentPosition.position.toString()
  }, [currentPosition])

  const { mutate: submitChangePosition } = useChangeCustomPositionMutation()

  const handleSubmit = (newPosition: string) => {
    if (!currentPosition) {
      submitChangePosition({
        itemType: props.itemType,
        dto: {
          ...buildCustomPositionDto({
            imdbItemId: props.itemId,
            userId: authUser!.id,
            position: Number(newPosition),
          }),
        },
      })

      return
    }

    submitChangePosition({
      itemType: props.itemType,
      dto: {
        ...currentPosition,
        position: Number(newPosition),
      },
    })
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
        selectedValue={currentPositionLabel}
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
    </VStack>
  )
}

export default CustomPositionSection
