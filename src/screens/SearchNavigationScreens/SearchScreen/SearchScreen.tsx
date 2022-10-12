import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Input, Text, VStack } from "native-base"
import React, { useRef, useState } from "react"
import { ScrollView } from "react-native"
import { IImdbItem } from "../../../types/domain/movie/MovieResultResponseDto"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import myAxios from "../../../utils/myAxios"
import { myColors } from "../../../utils/myColors"
import { urls } from "../../../utils/urls"
import SearchItem from "./SearchItem/SearchItem"

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<SearchScreenTypes, "Search">) => {
  const [text, setText] = useState("")

  const [imdbItems, setMovies] = useState<IImdbItem[]>([])

  const abortControllerRef = useRef(new AbortController())

  const [isSearching, setIsSearching] = useState(false)
  const submitSearch = () => {
    setIsSearching(true)
    myAxios
      .get<IImdbItem[]>(urls.api.search(text, "tv series"), {
        signal: abortControllerRef.current.signal,
      })
      .then((res) => setMovies(res.data))
      .catch((e) => {
        console.log({ e: e.message })
      })
      .finally(() => setIsSearching(false))
  }

  return (
    <VStack flex="1" backgroundColor={myColors.background}>
      <ScrollView style={{ paddingHorizontal: 4 }}>
        <Input
          placeholder="Search TV series"
          value={text}
          onChangeText={setText}
          returnKeyType="search"
          onSubmitEditing={submitSearch}
        />
        {isSearching && <Text>Searching...</Text>}

        {imdbItems?.map((imdbItem) => (
          <SearchItem
            imdbItem={imdbItem}
            key={imdbItem.id}
            onClick={() =>
              navigation.navigate("ImdbItem", { imdbId: imdbItem.id })
            }
          />
        ))}
      </ScrollView>
      {/* <HomeFooter /> */}
    </VStack>
  )
}

export default SearchScreen
