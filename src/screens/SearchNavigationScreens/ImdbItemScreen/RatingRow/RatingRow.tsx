import { MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import MyInterestButton from "./MyInterestButton/MyInterestButton"
import MyRatingButton from "./MyRatingButton/MyRatingButton"

interface Props {
  imdbAvgRating: number
  imdbRatingCount: number
  itemId: string
}

const RatingRow = (props: Props) => {
  return (
    <HStack mt={4} style={{ justifyContent: "space-around" }}>
      {props.imdbAvgRating >= 0 && props.imdbRatingCount >= 0 && (
        <VStack alignItems={"center"}>
          <MaterialCommunityIcons name="star" color={"#FFB600"} size={32} />

          <Text>
            <Text fontWeight="500" fontSize="md">
              {props.imdbAvgRating}
            </Text>
            /10
          </Text>

          <Text>
            {Intl.NumberFormat("en", { notation: "compact" }).format(
              props.imdbRatingCount
            )}{" "}
            ratings
          </Text>
          <Text>IMDB</Text>
        </VStack>
      )}

      <MyRatingButton itemId={props.itemId} />
      <MyInterestButton itemId={props.itemId} />
    </HStack>
  )
}

export default RatingRow
