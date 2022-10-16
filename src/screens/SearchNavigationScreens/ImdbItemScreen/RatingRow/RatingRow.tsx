import { MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import { formatCompactNumber } from "../../../../utils/math/formatCompactNumber"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"
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
      <VStackHCenter style={{ width: 120 }}>
        {props.imdbAvgRating >= 0 && props.imdbRatingCount >= 0 && (
          <VStack alignItems={"center"}>
            <MaterialCommunityIcons name="star" color={"#FFB600"} size={32} />

            <Text>
              <Text fontWeight="500" fontSize="md">
                {props.imdbAvgRating}
              </Text>
              /10
            </Text>

            <Text>{formatCompactNumber(props.imdbRatingCount)} ratings</Text>
            <Text>IMDB</Text>
          </VStack>
        )}
      </VStackHCenter>

      <VStackHCenter style={{ width: 120 }}>
        <MyRatingButton itemId={props.itemId} />
      </VStackHCenter>

      <VStackHCenter style={{ width: 120 }}>
        <MyInterestButton itemId={props.itemId} />
      </VStackHCenter>
    </HStack>
  )
}

export default RatingRow
