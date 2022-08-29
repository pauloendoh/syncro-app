import { Center, CheckIcon, Select } from "native-base";
import React, { useMemo } from "react";
import { useTagsQuery } from "../../../hooks/react-query/tag/useTagsQuery";

interface Props {
  selectedTagId: number | null;
  onChange: (tagId: number | null) => void;
}

const TagSelector = (props: Props) => {
  const { data: tags } = useTagsQuery();
  const handleChange = (value: string) => {
    if (value === "") {
      props.onChange(null);
      return;
    }

    props.onChange(Number(value));
  };

  const selectedValue = useMemo(
    () => (props.selectedTagId ? String(props.selectedTagId) : ""),
    [props.selectedTagId]
  );

  return (
    <Center>
      <Select
        selectedValue={selectedValue}
        width="148px"
        accessibilityLabel="Select tag"
        placeholder="Select tag"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={handleChange}
      >
        {tags?.map((tag) => (
          <Select.Item key={tag.id} label={tag.name} value={String(tag.id)} />
        ))}
      </Select>
    </Center>
  );
};

export default TagSelector;
