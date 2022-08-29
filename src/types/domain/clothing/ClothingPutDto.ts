import { Expose } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class ClothingPutDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  tagId: number | null;

  @Expose()
  @IsNumber()
  minDegree: number;

  @Expose()
  @IsNumber()
  maxDegree: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating: number | null;
}
