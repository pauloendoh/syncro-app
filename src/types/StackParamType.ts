import { ClothingGetDto } from "./domain/clothing/ClothingGetDto";

export type StackParamType = {
  Home: undefined;
  Clothing: { clothing: ClothingGetDto };
};
