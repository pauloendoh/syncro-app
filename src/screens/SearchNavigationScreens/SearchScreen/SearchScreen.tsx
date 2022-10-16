import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Input, Text, VStack } from "native-base"
import React, { useRef, useState } from "react"
import { ScrollView } from "react-native"
import { useMyColors } from "../../../hooks/useMyColors"
import { IImdbResultItem } from "../../../types/domain/movie/MovieResultResponseDto"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import myAxios from "../../../utils/myAxios"
import { urls } from "../../../utils/urls"
import SearchItem from "./SearchItem/SearchItem"

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<SearchScreenTypes, "Search">) => {
  const [text, setText] = useState("")

  const [imdbItems, setMovies] = useState<IImdbResultItem[]>([])

  const abortControllerRef = useRef(new AbortController())

  const [isSearching, setIsSearching] = useState(false)
  const submitSearch = () => {
    setIsSearching(true)
    myAxios
      .get<IImdbResultItem[]>(urls.api.search(text, "tv series"), {
        signal: abortControllerRef.current.signal,
      })
      .then((res) => setMovies(res.data))
      .catch((e) => {
        console.log({ e: e.message })
      })
      .finally(() => setIsSearching(false))
  }

  const { lightBackground } = useMyColors()

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Input
          placeholder="Search TV series"
          value={text}
          onChangeText={setText}
          returnKeyType="search"
          onSubmitEditing={submitSearch}
        />
        {isSearching && <Text>Searching...</Text>}

        <VStack space={4}>
          {imdbItems?.map((imdbItem) => (
            <SearchItem
              resultItem={imdbItem}
              key={imdbItem.id}
              onClick={() =>
                navigation.navigate("ImdbItem", { imdbId: imdbItem.id })
              }
            />
          ))}
        </VStack>
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SearchScreen
