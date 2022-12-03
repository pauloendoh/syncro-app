import { MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { shortNumberFormatter } from "../../../../utils/math/shortNumberFormatter"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"
import MyInterestButton from "./MyInterestButton/MyInterestButton"
import MyRatingButton from "./MyRatingButton/MyRatingButton"

interface Props {
  syncroItem: SyncroItemDto
}

const RatingRow = ({ syncroItem }: Props) => {
  return (
    <HStack mt={4} style={{ justifyContent: "space-around" }}>
      <VStackHCenter style={{ width: 100 }}>
        {syncroItem.avgRating > 0 && syncroItem.ratingCount > 0 && (
          <VStack alignItems={"center"}>
            <MaterialCommunityIcons name="star" color={"#FFB600"} size={32} />

            <Text>
              <Text fontWeight="500" fontSize="md">
                {syncroItem.avgRating}
              </Text>
              /10
            </Text>

            <Text>{shortNumberFormatter(syncroItem.ratingCount)} ratings</Text>
            <Text>{syncroItem.type === "game" ? "IGDB" : "IMDB"}</Text>
          </VStack>
        )}
      </VStackHCenter>

      <VStackHCenter style={{ width: 80 }}>
        <MyRatingButton itemId={syncroItem.id} />
      </VStackHCenter>

      <VStackHCenter style={{ width: 80 }}>
        <MyInterestButton itemId={syncroItem.id} />
      </VStackHCenter>
    </HStack>
  )
}

export default RatingRow
