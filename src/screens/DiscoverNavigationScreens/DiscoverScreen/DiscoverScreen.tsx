import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { VStack } from "native-base"
import React, { useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useMyColors } from "../../../hooks/useMyColors"
import { DiscoverScreenTypes } from "../../../types/DiscoverScreenTypes"
import DiscoverScreenTabView from "./DiscoverScreenTabView/DiscoverScreenTabView"
import NewUsersList from "./NewUsersList/NewUsersList"
import PopularUserList from "./PopularUserList/PopularUserList"
import SimilarUserList from "./SimilarUserList/SimilarUserList"

const DiscoverScreen = ({
  navigation,
}: NativeStackScreenProps<DiscoverScreenTypes, "Discover">) => {
  const { lightBackground } = useMyColors()

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView onRefresh={() => {}} refreshing={false}>
        <VStack mt={2} space={4} px={4}>
          <DiscoverScreenTabView
            tabIndex={tabIndex}
            changeTabIndex={setTabIndex}
          />
          {tabIndex === 0 && (
            <PopularUserList
              onPressUserId={(userId) => navigation.push("Profile", { userId })}
            />
          )}
          {tabIndex === 1 && (
            <SimilarUserList
              onPressUserId={(userId) => navigation.push("Profile", { userId })}
            />
          )}

          {tabIndex === 2 && (
            <NewUsersList
              onPressUserId={(userId) => navigation.push("Profile", { userId })}
            />
          )}
        </VStack>
      </MyScrollView>
    </VStack>
  )
}

export default DiscoverScreen
