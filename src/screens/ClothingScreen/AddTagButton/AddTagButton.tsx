import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { Button, Center, FormControl, Input, Modal } from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSaveTagMutation from "../../../hooks/react-query/tag/useSaveTagMutation";
import { TagPostDto } from "../../../types/domain/tag/TagPostDto";

interface Props {
  test?: string;
}

const resolver = classValidatorResolver(TagPostDto);

const AddTagButton = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { mutate } = useSaveTagMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TagPostDto>({
    defaultValues: {
      name: "",
    },
    resolver,
  });

  const onSubmit = async (data: TagPostDto) => {
    mutate(data, {
      onSuccess: () => setShowModal(false),
    });
  };

  useEffect(() => {
    if (showModal) reset();
  }, [showModal]);

  return (
    <Center>
      <Button onPress={() => setShowModal(true)}>Add tag</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Tag</Modal.Header>
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
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleSubmit(onSubmit)}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default AddTagButton;
