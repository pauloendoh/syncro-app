import { Center, CheckIcon, Select } from "native-base";
import React, { useMemo } from "react";
import { useTagsQuery } from "../../../hooks/react-query/tag/useTagsQuery";
import useTagModalStore from "../../../hooks/zustand/modals/useTagModalStore";
import { buildTagSaveDto } from "../../../types/domain/tag/TagSaveDto";

interface Props {
  selectedTagId: number | null;
  onChange: (tagId: number | null) => void;

  width?: string;
  noBorder?: boolean;
}

const TagSelector = (props: Props) => {
  const { data: tags } = useTagsQuery();

  const openTagModal = useTagModalStore((s) => s.openModal);

  const handleChange = (value: string) => {
    if (value === "") {
      props.onChange(null);
      return;
    }

    const numValue = Number(value);

    if (numValue === -1) return openTagModal(buildTagSaveDto());

    if (numValue === props.selectedTagId) return props.onChange(null);

    props.onChange(numValue);
  };

  const selectedValue = useMemo(
    () => (props.selectedTagId ? String(props.selectedTagId) : ""),
    [props.selectedTagId]
  );

  return (
    <Center>
      <Select
        selectedValue={selectedValue}
        width={props.width || "148px"}
        accessibilityLabel="Select tag"
        placeholder="Select tag"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={handleChange}
        borderColor={props.noBorder ? "transparent" : undefined}
        placeholderTextColor={props.noBorder ? "dark.900" : undefined}
      >
        {tags?.map((tag) => (
          <Select.Item
            key={tag.id}
            label={tag.name}
            value={String(tag.id)}
            onLongPress={() => {
              openTagModal({ name: tag.name, id: tag.id });
            }}
          />
        ))}

        <Select.Item label={"+ New Tag"} value={"-1"} />
      </Select>
    </Center>
  );
};

export default TagSelector;
