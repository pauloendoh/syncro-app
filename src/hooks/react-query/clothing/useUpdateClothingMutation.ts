import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "native-base";
import { ClothingDto } from "../../../types/domain/clothing/ClothingDto";
import pushOrReplace from "../../../utils/array/pushOrReplace";
import myAxios from "../../../utils/myAxios";
import { urls } from "../../../utils/urls";

const useUpdateClothingMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (payload: ClothingDto) =>
      myAxios
        .put<ClothingDto>(urls.api.clothingsId(payload.id), payload)
        .then((res) => res.data),
    {
      onSuccess: (resClothing) => {
        queryClient.setQueryData<ClothingDto[]>(
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
