import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import { FlatList, RefreshControl } from "react-native"
import { useHomeRatingsQuery } from "../../../hooks/react-query/feed/useHomeRatingsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
import HomeIsEmptySection from "./HomeIsEmptySection/HomeIsEmptySection"
import HomeRatingItem from "./HomeRatingItem/HomeRatingItem"

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<HomeScreenTypes, "Home">) => {
  const { lightBackground } = useMyColors()

  const {
    data: homeRatings,
    isLoading,
    isFetching,
    refetch,
  } = useHomeRatingsQuery()

  const isReady = useMemo(() => !isLoading || !!homeRatings, [
    isLoading,
    homeRatings,
  ])

  const [refreshedAt, setRefreshedAt] = useState(new Date().toISOString())

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <VStack
        flex={1}
        style={{
          paddingHorizontal: 8,
        }}
      >
        {isReady && homeRatings && homeRatings.length === 0 && (
          <HomeIsEmptySection />
        )}

        {homeRatings && (
          <VStack mt={4} space={4} flex={1}>
            <FlatList
              refreshing={!isReady}
              refreshControl={
                <RefreshControl
                  refreshing={!isReady}
                  onRefresh={() => {
                    refetch()
                    setRefreshedAt(new Date().toISOString())
                  }}
                />
              }
              data={homeRatings}
              keyExtractor={(item) => refreshedAt + item.id}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              renderItem={(props) => (
                <HomeRatingItem
                  {...props}
                  rating={props.item}
                  key={props.item.id}
                  onPress={() =>
                    navigation.push("SyncroItem", {
                      itemId: props.item.syncroItemId!,
                    })
                  }
                  onPressUser={() =>
                    navigation.push("Profile", {
                      userId: props.item.userId,
                    })
                  }
                />
              )}
            />
          </VStack>
        )}
      </VStack>
    </VStack>
  )
}

export default HomeScreen
