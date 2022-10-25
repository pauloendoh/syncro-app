import { MaterialIcons } from "@expo/vector-icons"
import { Icon, Input } from "native-base"
import React, { ReactNode } from "react"
import useSearchStore from "../../../../hooks/zustand/useSearchStore"
import HStackVCenter from "../../../_common/flexboxes/HStackVCenter"

interface Props {
  children: ReactNode
}

const SearchHeaderTitle = (props: Props) => {
  const { searchText, setSearchText, onSubmit } = useSearchStore()
  return (
    <HStackVCenter {...props} justifyContent="center" style={{ maxWidth: 330 }}>
      <Input
        InputLeftElement={
          <Icon as={<MaterialIcons name="search" />} color="gray.400" />
        }
        variant="unstyled"
        placeholder={"Search TV series, users..."}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        onSubmitEditing={(e) => {
          onSubmit(searchText)
        }}
      />
    </HStackVCenter>
  )
}

export default SearchHeaderTitle
