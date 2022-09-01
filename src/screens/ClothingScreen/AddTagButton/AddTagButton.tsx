import { Button, Center } from "native-base";
import React from "react";
import useTagModalStore from "../../../hooks/zustand/modals/useTagModalStore";
import { buildTagSaveDto } from "../../../types/domain/tag/TagSaveDto";

const AddTagButton = () => {
  const openModal = useTagModalStore((s) => s.openModal);

  return (
    <Center>
      <Button onPress={() => openModal(buildTagSaveDto())}>Add tag</Button>
    </Center>
  );
};

export default AddTagButton;
