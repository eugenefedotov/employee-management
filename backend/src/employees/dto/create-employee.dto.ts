import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Office } from '../enums/office.enum';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Office)
  office: Office;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  positiveTagIds?: string[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  negativeTagIds?: number[];
}
