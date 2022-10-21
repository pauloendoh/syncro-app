import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { RefreshControl, ScrollView } from "react-native"
import { useHomeRatingsQuery } from "../../../hooks/react-query/feed/useHomeRatingsQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import { HomeScreenTypes } from "../../../types/HomeScreenTypes"
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

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <VStack
          style={{
            paddingTop: 64,
            paddingHorizontal: 8,
          }}
        >
          <Text fontWeight="semibold" style={{ fontSize: 24 }}>
            Home
          </Text>
          {!isReady && <Text>Loading...</Text>}
          {homeRatings && (
            <VStack mt={4} space={4}>
              {homeRatings.map((rating) => (
                <HomeRatingItem
                  rating={rating}
                  key={rating.id}
                  onPress={() =>
                    navigation.navigate("ImdbItem", {
                      imdbId: rating.imdbItemId!,
                    })
                  }
                />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default HomeScreen
