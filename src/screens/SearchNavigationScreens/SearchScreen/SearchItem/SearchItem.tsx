import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base"
import React from "react"
import { IImdbResultItem } from "../../../../types/domain/movie/MovieResultResponseDto"
import { shortNumberFormatter } from "../../../../utils/math/shortNumberFormatter"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"
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
        {resultItem?.image?.url ? (
          <Image
            src={resultItem.image.url}
            width="100px"
            height="100px"
            alt={resultItem.title}
          />
        ) : (
          <Box width="100px" height="100px" />
        )}

        <VStack style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: "500" }}>
            {resultItem.title} {resultItem.year && `(${resultItem.year})`}
          </Text>

          <HStack mt={2}>
            <VStack style={{ width: 120 }}>
              <Text fontWeight="semibold">IMDB</Text>
              {resultItem.imdbItem ? (
                <>
                  <HStackVCenter space={1}>
                    <VStackHCenter style={{ width: 24 }}>
                      <MaterialCommunityIcons
                        name="star"
                        color={"#FFB600"}
                        size={18}
                      />
                    </VStackHCenter>
                    <Text>{resultItem.imdbItem.avgRating}/10</Text>
                  </HStackVCenter>
                  <HStackVCenter space={1}>
                    <VStackHCenter style={{ width: 24 }}>
                      <MaterialCommunityIcons
                        name="eye"
                        color={theme.colors.dark[900]}
                        size={18}
                      />
                    </VStackHCenter>
                    <Text>
                      {shortNumberFormatter(resultItem.imdbItem.ratingCount)}{" "}
                      votes
                    </Text>
                  </HStackVCenter>
                </>
              ) : (
                <Text>See details</Text>
              )}
            </VStack>
            <VStack style={{ width: 120 }}>
              {resultItem.myRating && (
                <SearchItemYourSection
                  ratingValue={resultItem.myRating.ratingValue}
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
