import { HStack, Image, Pressable, Text, useTheme, VStack } from "native-base"
import React from "react"
import { IImdbResultItem } from "../../../../types/domain/movie/MovieResultResponseDto"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
import SearchItemImdbSection from "./SearchItemImdbSection/SearchItemImdbSection"
import SearchItemYourSection from "./SearchItemYourSection/SearchItemYourSection"

interface Props {
  resultItem: IImdbResultItem
  onClick: () => void
}

const SearchItem = ({ resultItem, onClick }: Props) => {
  const theme = useTheme()
  return (
    <Pressable onPress={onClick}>
      <HStack space="4">
        <Image
          src={getImageUrlOrDefaultUrl(resultItem?.image?.url)}
          width="100px"
          height="100px"
          alt={resultItem.title}
        />

        <VStack style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: "500" }}>
            {resultItem.title} {resultItem.year && `(${resultItem.year})`}
          </Text>

          <HStack mt={2}>
            <VStack style={{ width: 120 }}>
              {resultItem.imdbItem ? (
                <SearchItemImdbSection
                  avgRating={resultItem.imdbItem?.avgRating}
                  ratingCount={resultItem.imdbItem?.ratingCount}
                />
              ) : (
                <Text>See details</Text>
              )}
            </VStack>
            <VStack style={{ width: 120 }}>
              {/*  */}
              {Boolean(
                resultItem.myRating?.ratingValue ||
                  resultItem.myInterest?.interestLevel
              ) && (
                <SearchItemYourSection
                  ratingValue={resultItem.myRating?.ratingValue}
                  interestLevel={resultItem.myInterest?.interestLevel}
                />
              )}
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default SearchItem
