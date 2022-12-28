import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Box, Text, VStack } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import MyScrollView from "../../../components/MyScrollView/MyScrollView"
import { useOverallSearchQuery } from "../../../hooks/react-query/search/useOverallSearchQuery"
import { useMyColors } from "../../../hooks/useMyColors"
import useSearchStore from "../../../hooks/zustand/useSearchStore"
import { useSyncroItemTypeMap } from "../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import { SearchScreenTypes } from "../../../types/SearchScreenTypes"
import SearchScreenTabView from "./SearchScreenTabView/SearchScreenTabView"
import SyncroItemSearchResults from "./SyncroItemSearchResults/SyncroItemSearchResults"
import UserSearchResults from "./UserSearchResults/UserSearchResults"

const SearchScreen = ({
  navigation,
}: NativeStackScreenProps<SearchScreenTypes, "Search">) => {
  const { submittedText: query, onSubmit, setSearchText } = useSearchStore()

  const { lightBackground } = useMyColors()

  const [tabIndex, setTabIndex] = useState(0)

  const queryIsValid = useMemo(() => query.length >= 3, [query])

  const itemTypeMap = useSyncroItemTypeMap({
    tabIndex,
  })

  const { data: searchResultItems, isLoading } = useOverallSearchQuery(
    query,
    itemTypeMap?.itemType
  )

  useEffect(() => {
    onSubmit("")
    setSearchText("")
  }, [tabIndex])

  const text = useMemo(() => {
    if (!itemTypeMap) return ""
    if (isLoading && query.length > 0)
      return `Searching for \"${query}\" ${itemTypeMap.getTypeLabelLowerCase(
        true
      )} ...`
    if (searchResultItems && searchResultItems.length > 0)
      return `${
        searchResultItems.length
      } results for \"${query}\" ${itemTypeMap.getTypeLabelLowerCase(true)}:`

    return ""
  }, [isLoading, searchResultItems, query, itemTypeMap])

  return (
    <VStack flex="1" backgroundColor={lightBackground}>
      <MyScrollView refreshing={false} onRefresh={() => {}}>
        <VStack px={4}>
          <Box mt={2} />

          <SearchScreenTabView
            tabIndex={tabIndex}
            changeTabIndex={setTabIndex}
          />

          <Box mt={4}>
            {text.length > 0 && (
              <Text fontSize="md" fontWeight="semibold">
                {text}
              </Text>
            )}
          </Box>
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
                <SyncroItemSearchResults
                  query={query}
                  onClickItemId={(imdbId) =>
                    navigation.push("SyncroItem", { itemId: imdbId })
                  }
                  itemType="manga"
                />
              )}

              {tabIndex === 4 && (
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
