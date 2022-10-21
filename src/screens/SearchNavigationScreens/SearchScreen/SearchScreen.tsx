import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, Input, VStack } from "native-base"
import React, { useMemo, useRef, useState } from "react"
import { ScrollView, TextInput } from "react-native"
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

  const inputRef = useRef<TextInput | null>(null)

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Input
          ref={inputRef}
          placeholder={placeholderText}
          value={textInput}
          onChangeText={setTextInput}
          returnKeyType="search"
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
