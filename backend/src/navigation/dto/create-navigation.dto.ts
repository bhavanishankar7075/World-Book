import { IsString } from "class-validator";

export class CreateNavigationDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;
}
