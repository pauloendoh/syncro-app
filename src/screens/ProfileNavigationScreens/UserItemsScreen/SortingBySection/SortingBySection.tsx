import { Box, CheckIcon, Select } from "native-base"
import React from "react"
import {
  getSortingOptions,
  SortingByTypes,
} from "../../../../types/domain/others/SortingByTypes"

interface Props {
  sortingBy: SortingByTypes
  onChangeSortingBy: (sortingBy: SortingByTypes) => void
  thisIsYourList: boolean
}

const SortingBySection = (props: Props) => {
  return (
    <>
      <Box maxW="300">
        <Select
          selectedValue={props.sortingBy}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "gray.500",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) =>
            props.onChangeSortingBy(itemValue as SortingByTypes)
          }
        >
          {getSortingOptions(props.thisIsYourList).map((option) => (
            <Select.Item
              key={option.type}
              label={option.label}
              value={option.type}
            />
          ))}
        </Select>
      </Box>
    </>
  )
}

export default SortingBySection
