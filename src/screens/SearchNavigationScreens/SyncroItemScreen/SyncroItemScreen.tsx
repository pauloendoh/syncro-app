import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Box, HStack, Image, Text, VStack } from "native-base"
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useSyncroItemDetailsQuery } from "../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import SyncroItemIcon from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemIcon"
import { useSyncroItemTypeMap } from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import { ProfileScreenTypes } from "../../../types/ProfileScreenTypes"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import { getImageUrlOrDefaultUrl } from "../../../utils/getImageUrlOrDefaultUrl"
import { shortNumberFormatter } from "../../../utils/math/shortNumberFormatter"
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

  const shouldShowMenu = useMemo(() => {
    if (!data) return false

    const wasUpdatedWithinLastWeek =
      new Date(data.updatedAt) >
      new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
    if (wasUpdatedWithinLastWeek) return false

    if (data.type === "movie" || data.type === "tvSeries") return true

    return false
  }, [data])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.title || "Loading...",
      headerRight: () => {
        if (data && shouldShowMenu)
          return <SyncroItemHeaderMenu syncroItem={data} />
      },
    })
  }, [data])

  const typeMap = useSyncroItemTypeMap({
    itemType: data?.type,
  })

  const [ready, setReady] = useState(false)
  useLayoutEffect(() => {
    if (data) {
      setReady(true)
    }
  }, [data])

  if (!data) return <VStack flex="1" backgroundColor={lightBackground} />

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView refreshing={isLoading} onRefresh={refetch}>
        <VStack mt={4} px={4} space={4}>
          <HStack space={3}>
            {/* conditional to fix message: "please provide an alt title"  */}
            {data?.title && (
              <Image
                src={getImageUrlOrDefaultUrl(data?.imageUrl)}
                height="120px"
                width="120px"
                alt={data?.title}
              />
            )}

            <VStack style={{ flexShrink: 1 }} space={2}>
              <Text fontSize="md" fontWeight={"bold"}>
                {data?.title} {data?.year && `(${data?.year})`}
              </Text>

              {data.avgRating > 0 && data.ratingCount > 0 && (
                <HStack alignItems={"center"}>
                  <HStackVCenter width="88px" space={1}>
                    <MaterialCommunityIcons
                      name="star"
                      color={"#FFB600"}
                      size={20}
                    />

                    <Text>
                      {data.avgRating}
                      /10
                    </Text>
                  </HStackVCenter>

                  <Text>
                    {shortNumberFormatter(data.ratingCount)} votes on{" "}
                  </Text>
                  <Text>{typeMap.site}</Text>
                </HStack>
              )}

              <HStack space={1}>
                <SyncroItemIcon type={data.type} size={18} />
                <Text width="88px">{typeMap.getTypeLabel()}</Text>
              </HStack>
            </VStack>
          </HStack>

          {ready ? (
            <VStack space={4}>
              <MyViewMoreText numberOfLines={4}>
                <Text>{data?.plotSummary}</Text>
              </MyViewMoreText>
            </VStack>
          ) : (
            <Text>Loading...</Text>
          )}

          {data && (
            <Box mt={4}>
              <RatingRow syncroItem={data} />
            </Box>
          )}
        </VStack>
      </MyScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SyncroItemScreen
