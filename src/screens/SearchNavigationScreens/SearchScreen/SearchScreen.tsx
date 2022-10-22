import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, Input, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import { ScrollView } from "react-native"
import { useMyColors } from "../../../hooks/useMyColors"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import TabViewExample from "./TabViewExample/TabViewExample"
import TvSeriesSearchResults from "./TvSeriesSearchResults/TvSeriesSearchResults"
import UserSearchResults from "./UserSearchResults/UserSearchResults"

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<SearchScreenTypes, "Search">) => {
  const [textInput, setTextInput] = useState("")

  const { lightBackground } = useMyColors()

  const [tabIndex, setTabIndex] = useState(0)

  const placeholderText = useMemo(() => {
    if (tabIndex === 0) return "Search TV series"
    return "Search users"
  }, [tabIndex])

  const [query, setQuery] = useState("")
  const queryIsValid = useMemo(() => query.length >= 3, [query])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Input
          placeholder={placeholderText}
          value={textInput}
          onChangeText={setTextInput}
          returnKeyType="search"
          onSubmitEditing={(e) => {
            setQuery(textInput)
          }}
        />

        <Box mt={4} />
        <TabViewExample tabIndex={tabIndex} changeTabIndex={setTabIndex} />

        {queryIsValid && (
          <VStack space={4}>
            {tabIndex === 0 && (
              <TvSeriesSearchResults
                query={query}
                onClickImdbItemId={(imdbId) =>
                  navigation.navigate("ImdbItem", { imdbId })
                }
              />
            )}

            {tabIndex === 1 && (
              <UserSearchResults
                query={query}
                onClickUser={(user) =>
                  navigation.navigate("Profile", { userId: user.id })
                }
              />
            )}
          </VStack>
        )}
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SearchScreen
