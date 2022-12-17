import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useMyColors } from "../../../hooks/useMyColors"
import useSearchStore from "../../../hooks/zustand/useSearchStore"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import SearchScreenTabView from "./SearchScreenTabView/SearchScreenTabView"
import SyncroItemSearchResults from "./SyncroItemSearchResults/SyncroItemSearchResults"
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
        <VStack px={4}>
          <Box mt={2} />

          <SearchScreenTabView
            tabIndex={tabIndex}
            changeTabIndex={setTabIndex}
          />

          {/* {query.trim() === "" && <SearchScreenImportSection tabIndex={0} />} */}

          {queryIsValid && (
            <VStack space={4}>
              {tabIndex === 0 && (
                <SyncroItemSearchResults
                  query={query}
                  onClickItemId={(imdbId) =>
                    navigation.push("SyncroItem", { itemId: imdbId })
                  }
                  itemType="tvSeries"
                />
              )}

              {tabIndex === 1 && (
                <SyncroItemSearchResults
                  query={query}
                  onClickItemId={(imdbId) =>
                    navigation.push("SyncroItem", { itemId: imdbId })
                  }
                  itemType="movie"
                />
              )}

              {tabIndex === 2 && (
                <SyncroItemSearchResults
                  query={query}
                  onClickItemId={(imdbId) =>
                    navigation.push("SyncroItem", { itemId: imdbId })
                  }
                  itemType="game"
                />
              )}

              {tabIndex === 3 && (
                <UserSearchResults
                  query={query}
                  onClickUser={(user) =>
                    navigation.push("Profile", { userId: user.id })
                  }
                />
              )}
            </VStack>
          )}
        </VStack>
      </MyScrollView>
    </VStack>
  )
}

export default SearchScreen
