import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Divider, HStack, Image, Text, VStack } from "native-base"
import React, { useEffect } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useImdbItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import ImdbItemMenu from "./ImdbItemMenu/ImdbItemMenu"
import RatingRow from "./RatingRow/RatingRow"

export type ProfileScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<SearchScreenTypes, "SyncroItem">,
  CompositeScreenProps<
    BottomTabScreenProps<ProfileScreenTypes, "SyncroItem">,
    BottomTabScreenProps<HomeScreenTypes, "SyncroItem">
  >
>

const SyncroItemScreen = ({
  navigation,
  route,
}: BottomTabScreenProps<SearchScreenTypes, "SyncroItem">) => {
  const { data, isLoading, refetch } = useImdbItemDetailsQuery(
    route.params.itemId
  )

  const { lightBackground } = useMyColors()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "Loading...",
      headerRight: () => <ImdbItemMenu imdbItemId={route.params.itemId} />,
    })
  }, [data])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView refreshing={isLoading} onRefresh={refetch}>
        <VStack mt={4} px={4}>
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
                src={getImageUrlOrDefaultUrl(data?.imageUrl)}
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
      </MyScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SyncroItemScreen
