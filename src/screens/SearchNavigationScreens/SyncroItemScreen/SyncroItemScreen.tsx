import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Divider, HStack, Image, Text, VStack } from "native-base"
import React, { useEffect, useMemo } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useSyncroItemDetailsQuery } from "../../../hooks/react-query/imdb-item/useImdbItemDetailsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"
import HStackVCenter from "../../_common/flexboxes/HStackVCenter"
import MyViewMoreText from "../../_common/text/MyViewMoreText/MyViewMoreText"
import RatingRow from "./RatingRow/RatingRow"
import SyncroItemHeaderMenu from "./SyncroItemHeaderMenu/SyncroItemHeaderMenu"

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
  const { data, isLoading, refetch } = useSyncroItemDetailsQuery(
    route.params.itemId
  )

  const { lightBackground } = useMyColors()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "Loading...",
      headerRight: () => {
        if (!data) return <></>
        return <SyncroItemHeaderMenu syncroItem={data} />
      },
    })
  }, [data])

  const itemType = useMemo(() => {
    if (!data) return ""
    if (data.type === "game") return "Game"
    if (data.type === "movie") return "Movie"
    if (data.type === "tvSeries") return "TV Series"
    return ""
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
            <Text>{itemType}</Text>

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
              <MyViewMoreText numberOfLines={10}>
                <Text>{data?.plotSummary}</Text>
              </MyViewMoreText>
            </VStack>
          </HStack>
          <Divider mt={2} />

          {data && <RatingRow syncroItem={data} />}
        </VStack>
      </MyScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SyncroItemScreen
