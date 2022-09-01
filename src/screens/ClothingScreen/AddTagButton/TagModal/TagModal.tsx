import { AntDesign } from "@expo/vector-icons";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Button, FormControl, HStack, Input, Modal, Text } from "native-base";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useDeleteTagMutation from "../../../../hooks/react-query/tag/useDeleteTagMutation";
import useSaveTagMutation from "../../../../hooks/react-query/tag/useSaveTagMutation";
import useTagModalStore from "../../../../hooks/zustand/modals/useTagModalStore";
import { TagSaveDto } from "../../../../types/domain/tag/TagSaveDto";
import HStackVCenter from "../../../_common/flexboxes/FlexVCenter";
import TagModalMenu from "./TagModalMenu/TagModalMenu";

const resolver = classValidatorResolver(TagSaveDto);

const TagModal = () => {
  const { isOpen, initialValue, closeModal } = useTagModalStore();

  const { mutate } = useSaveTagMutation();
  const { mutate: mutateDeleteTag } = useDeleteTagMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TagSaveDto>({
    resolver,
  });

  const onSubmit = async (data: TagSaveDto) => {
    mutate(data, {
      onSuccess: closeModal,
    });
  };

  useEffect(() => {
    if (isOpen && initialValue) reset(initialValue);
  }, [isOpen, initialValue]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content maxWidth="400px">
        <Modal.Header>
          <HStack justifyContent="space-between">
            <Text>Tag</Text>
            <HStackVCenter space="4">
              {initialValue?.id && (
                <TagModalMenu
                  onDelete={() =>
                    mutateDeleteTag(initialValue, { onSuccess: closeModal })
                  }
                />
              )}

              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={closeModal}
              />
            </HStackVCenter>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormControl.Label>Tag name</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="name"
            />
            <FormControl.ErrorMessage>
              {errors.name?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
              Cancel
            </Button>
            <Button onPress={handleSubmit(onSubmit)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default TagModal;
