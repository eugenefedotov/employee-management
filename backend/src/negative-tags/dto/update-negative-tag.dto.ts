import { PartialType } from '@nestjs/mapped-types';
import { CreateNegativeTagDto } from './create-negative-tag.dto';

export class UpdateNegativeTagDto extends PartialType(CreateNegativeTagDto) {}
