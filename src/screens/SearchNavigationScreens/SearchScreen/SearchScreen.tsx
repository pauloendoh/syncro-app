import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { ScrollView } from "react-native"
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

  const [hasSearchedOnce, setHasSearchedOnce] = useState(false)
  useEffect(() => {
    if (query !== "") setHasSearchedOnce(true)
  }, [query])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Box mt={2} />

        {hasSearchedOnce && (
          <>
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
          </>
        )}
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SearchScreen
