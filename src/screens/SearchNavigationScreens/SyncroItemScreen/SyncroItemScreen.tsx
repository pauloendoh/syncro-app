import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Divider, HStack, Image, Text, VStack } from "native-base"
import React, { useEffect, useLayoutEffect, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useSyncroItemDetailsQuery } from "../../../hooks/react-query/syncro-item/useSyncroItemDetailsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { useSyncroItemTypeMap } from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
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

  const typeMap = useSyncroItemTypeMap({
    itemType: data?.type,
  })

  const [ready, setReady] = useState(false)
  useLayoutEffect(() => {
    if (data) {
      setReady(true)
    }
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
            <Text>{typeMap.getLabel()}</Text>

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
              {ready ? (
                <MyViewMoreText numberOfLines={10}>
                  <Text>{data?.plotSummary}</Text>
                </MyViewMoreText>
              ) : (
                <Text>Loading...</Text>
              )}
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
