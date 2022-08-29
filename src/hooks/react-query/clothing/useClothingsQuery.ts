import { useQuery } from "@tanstack/react-query";
import { ClothingGetDto } from "../../../types/domain/clothing/ClothingGetDto";
import { urls } from "../../../utils/urls";

export const useClothingsQuery = () => {
  return useQuery<ClothingGetDto[], Error>([urls.api.clothings]);
};
