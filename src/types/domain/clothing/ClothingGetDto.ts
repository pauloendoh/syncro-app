export interface ClothingGetDto {
  id: number;
  userId: number;
  tagId: number | null;

  imgUrl: string;
  minDegree: number;
  maxDegree: number;
  rating: number | null;
}
