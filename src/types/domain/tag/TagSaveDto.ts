import { Expose } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class TagSaveDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id?: number;

  @Expose()
  @IsString()
  @MinLength(1, { message: "Tag name is required." })
  @MaxLength(255, { message: "Limit of 255 characters." })
  name: string;
}

export const buildTagSaveDto = (p?: Partial<TagSaveDto>): TagSaveDto => ({
  name: "",
  ...p,
});
