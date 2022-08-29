import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transformAndValidate } from "class-transformer-validator";
import { useToast } from "native-base";
import { ClothingGetDto } from "../../../types/domain/clothing/ClothingGetDto";
import { ClothingPutDto } from "../../../types/domain/clothing/ClothingPutDto";
import pushOrReplace from "../../../utils/array/pushOrReplace";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";

const useUpdateClothingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    async (payload: ClothingGetDto) => {
      const updateDto = await transformAndValidate(ClothingPutDto, payload, {
        transformer: {
          excludeExtraneousValues: true,
        },
      });

      return myAxios
        .put<ClothingGetDto>(urls.api.clothingsId(payload.id), updateDto)
        .then((res) => res.data);
    },
    {
      onSuccess: (resClothing) => {
        queryClient.setQueryData<ClothingGetDto[]>(
          [urls.api.clothings],
          (currClothings) => {
            return pushOrReplace(currClothings, resClothing, "id");
          }
        );
      },
      onError: (err: Error) => {
        toast.show({
          description: err.message,
        });
      },
    }
  );
};

export default useUpdateClothingMutation;
