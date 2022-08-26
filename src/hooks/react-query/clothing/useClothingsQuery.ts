import { useQuery } from "@tanstack/react-query";
import { ClothingDto } from "../../../types/domain/clothing/ClothingDto";
import { urls } from "../../../utils/urls";

export const useClothingsQuery = () => {
  return useQuery<ClothingDto[], Error>([urls.api.clothings]);
};
