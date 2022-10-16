import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Text, VStack } from "native-base"
import React, { useMemo } from "react"
import { ScrollView } from "react-native"
import { useHomeRatingsQuery } from "../../hooks/react-query/feed/useHomeRatingsQuery"
import { useMyColors } from "../../hooks/useMyColors"
import { NavigationParamType } from "../../types/NavigationParamType"
import HomeRatingItem from "./HomeRatingItem/HomeRatingItem"

const HomeScreen = ({
  navigation,
}: BottomTabScreenProps<NavigationParamType, "Home">) => {
  const { lightBackground } = useMyColors()

  const { data: homeRatings, isLoading } = useHomeRatingsQuery()

  const isReady = useMemo(() => !isLoading || !!homeRatings, [
    isLoading,
    homeRatings,
  ])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView>
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
                <HomeRatingItem rating={rating} key={rating.id} />
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
