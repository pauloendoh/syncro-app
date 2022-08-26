import { ClothingDto } from "./domain/clothing/ClothingDto";

export type StackParamType = {
  Home: undefined;
  Clothing: { clothing: ClothingDto };
};
