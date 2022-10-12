import { Box, HStack, Image, Pressable, Text, VStack } from "native-base"
import React from "react"
import { IImdbItem } from "../../../../types/domain/movie/MovieResultResponseDto"

interface Props {
  imdbItem: IImdbItem
  onClick: () => void
}

const SearchItem = ({ imdbItem, onClick }: Props) => {
  return (
    <HStack space="4">
      {imdbItem?.image?.url ? (
        <Pressable onPress={onClick}>
          <Image
            src={imdbItem.image.url}
            width="100px"
            height="100px"
            alt={imdbItem.title}
          />
        </Pressable>
      ) : (
        <Box width="100px" height="100px" />
      )}

      <VStack style={{ flexShrink: 1 }}>
        <Text style={{ fontWeight: "500" }}>
          {imdbItem.title} ({imdbItem.year})
        </Text>
      </VStack>
    </HStack>
  )
}

export default SearchItem
