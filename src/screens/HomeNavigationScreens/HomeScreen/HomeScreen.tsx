import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { VStack } from "native-base"
import React, { useMemo } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
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
      <MyScrollView refreshing={!isReady} onRefresh={refetch}>
        <VStack
          style={{
            paddingHorizontal: 8,
          }}
        >
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
      </MyScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default HomeScreen
