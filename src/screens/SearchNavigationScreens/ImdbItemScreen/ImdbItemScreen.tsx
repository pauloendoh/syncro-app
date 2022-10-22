import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Divider, HStack, Image, Text, VStack } from "native-base"
import React from "react"
import { ScrollView } from "react-native"
import { useImdbItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import LoadingScreen from "../../LoadingScreen/LoadingScreen"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import RatingRow from "./RatingRow/RatingRow"

export type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<SearchScreenTypes, "ImdbItem">,
  CompositeScreenProps<
    BottomTabScreenProps<ProfileScreenTypes, "ImdbItem">,
    BottomTabScreenProps<HomeScreenTypes, "ImdbItem">
  >
>

const ImdbItemScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<SearchScreenTypes, "ImdbItem">) => {
  const { data, isLoading } = useImdbItemDetailsQuery(route.params.imdbId)

  const { lightBackground } = useMyColors()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <VStack>
          <HStackVCenter>
            <Text fontSize="lg" fontWeight={"semibold"}>
              {data?.title}
            </Text>
          </HStackVCenter>

          <HStackVCenter mt="4" space="4">
            <Text>{data?.type === "tvSeries" ? "TV Series" : "Movie"}</Text>

            <Text>{data?.year}</Text>
          </HStackVCenter>

          <HStack mt={4} space={3}>
            {/* conditional to fix message: "please provide an alt title"  */}
            {data?.title && (
              <Image
                src={data?.imageUrl}
                height="120px"
                width="120px"
                alt={data?.title}
              />
            )}

            <VStack style={{ flexShrink: 1 }}>
              <Text>{data?.plotSummary}</Text>
            </VStack>
          </HStack>
          <Divider mt={2} />

          {data && (
            <RatingRow
              imdbAvgRating={data.avgRating}
              imdbRatingCount={data.ratingCount}
              itemId={data.id}
            />
          )}
        </VStack>
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default ImdbItemScreen
