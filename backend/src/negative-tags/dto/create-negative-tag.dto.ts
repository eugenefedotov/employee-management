import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateNegativeTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsHexColor()
  color: string;
}
