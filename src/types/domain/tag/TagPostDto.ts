import { IsString, MaxLength, MinLength } from "class-validator";

export class TagPostDto {
  @IsString()
  @MinLength(1, { message: "Tag name is required." })
  @MaxLength(255, { message: "Limit of 255 characters." })
  name: string;
}
