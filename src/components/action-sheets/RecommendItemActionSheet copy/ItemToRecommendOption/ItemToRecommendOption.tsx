import { Button, HStack, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { useItemsRecommendationsFromMeQuery } from "../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery"
import { ItemToRecommendDto } from "../../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery"
import useRecommendItemMutation from "../../../../hooks/react-query/syncro-item/useRecommendItemMutation"
import SyncroItemImage from "../../../../screens/_common/SyncroItemImage/SyncroItemImage"

interface Props {
  itemToRecommend: ItemToRecommendDto
  userId: string
}

const ItemToRecommendOption = ({
  itemToRecommend: itemToRecommend,
  userId,
}: Props) => {
  const { item, myRating, theySaved } = itemToRecommend

  const { data: myRecommendations } = useItemsRecommendationsFromMeQuery()
  const buttonLabel = useMemo(() => {
    if (theySaved) return "Already saved"

    if (
      myRecommendations?.find(
        (r) => r.itemId === item.id && userId === r.toUserId
      )
    )
      return "Recommended"

    return "Recommend"
  }, [myRecommendations, theySaved])

  const isDisabled = useMemo(
    () => buttonLabel === "Already saved" || buttonLabel === "Recommended",

    [buttonLabel]
  )

  const { mutate: submitRecommendItem, isLoading } = useRecommendItemMutation()

  return (
    <HStack space="4" flex={1}>
      <SyncroItemImage syncroItem={item} />

      <VStack space={2}>
        <HStack flex={1}>
          <Text flex={1}>
            {item.title} {item.year && `(${item.year})`}
          </Text>
        </HStack>
        <Button
          disabled={isDisabled}
          colorScheme={isDisabled ? "gray" : "secondary"}
          width="200px"
          onPress={() =>
            submitRecommendItem({
              itemId: item.id,
              userId,
            })
          }
          isLoading={isLoading}
        >
          {buttonLabel}
        </Button>
      </VStack>
    </HStack>
  )
}

export default ItemToRecommendOption
