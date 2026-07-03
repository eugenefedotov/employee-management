import { PartialType } from '@nestjs/mapped-types';
import { CreatePositiveTagDto } from './create-positive-tag.dto';

export class UpdatePositiveTagDto extends PartialType(CreatePositiveTagDto) {}
