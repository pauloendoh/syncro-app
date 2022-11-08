import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useMyColors } from "../../../hooks/useMyColors"
import useSearchStore from "../../../hooks/zustand/useSearchStore"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import ImdbSearchResults from "./ImdbSearchResults/ImdbSearchResults"
import TabViewExample from "./TabViewExample/TabViewExample"
import UserSearchResults from "./UserSearchResults/UserSearchResults"

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<SearchScreenTypes, "Search">) => {
  const { submittedText: query } = useSearchStore()

  const { lightBackground } = useMyColors()

  const [tabIndex, setTabIndex] = useState(0)

  const queryIsValid = useMemo(() => query.length >= 3, [query])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView refreshing={false} onRefresh={() => {}}>
        <VStack px={4}></VStack>

        <Box mt={2} />

        <TabViewExample tabIndex={tabIndex} changeTabIndex={setTabIndex} />

        {queryIsValid && (
          <VStack space={4}>
            {tabIndex === 0 && (
              <ImdbSearchResults
                query={query}
                onClickImdbItemId={(imdbId) =>
                  navigation.navigate("ImdbItem", { imdbId })
                }
                itemType="tv series"
              />
            )}

            {tabIndex === 1 && (
              <ImdbSearchResults
                query={query}
                onClickImdbItemId={(imdbId) =>
                  navigation.navigate("ImdbItem", { imdbId })
                }
                itemType="movie"
              />
            )}

            {tabIndex === 2 && (
              <UserSearchResults
                query={query}
                onClickUser={(user) =>
                  navigation.navigate("Profile", { userId: user.id })
                }
              />
            )}
          </VStack>
        )}
      </MyScrollView>
    </VStack>
  )
}

export default SearchScreen
