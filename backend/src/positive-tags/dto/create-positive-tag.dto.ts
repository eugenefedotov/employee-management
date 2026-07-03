import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreatePositiveTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  color: string;
}
