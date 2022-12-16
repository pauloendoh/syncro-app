import { Button, HStack, Image, Text, VStack } from "native-base"
import React, { useMemo } from "react"
import useRecommendItemMutation from "../../../../hooks/react-query/imdb-item/useRecommendItemMutation"
import { useItemsRecommendationsFromMeQuery } from "../../../../hooks/react-query/item-recommendation/useItemsRecommendationsFromMeQuery"
import { ItemToRecommendDto } from "../../../../hooks/react-query/item-recommendation/useItemsToRecommendQuery"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"

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
      <Image
        src={getImageUrlOrDefaultUrl(item.imageUrl)}
        width="100px"
        height="100px"
        alt={item.title}
      />

      <VStack space={2}>
        <Text flexWrap={"wrap"} width="90%">
          {item.title} {item.year && `(${item.year})`}
        </Text>
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
