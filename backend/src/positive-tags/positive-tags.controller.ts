import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PositiveTagsService } from './positive-tags.service';
import { CreatePositiveTagDto } from './dto/create-positive-tag.dto';
import { UpdatePositiveTagDto } from './dto/update-positive-tag.dto';

@Controller('positive-tags')
export class PositiveTagsController {
  constructor(private positiveTagsService: PositiveTagsService) {}

  @Post()
  create(@Body() dto: CreatePositiveTagDto) {
    return this.positiveTagsService.create(dto);
  }

  @Get()
  findAll() {
    return this.positiveTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positiveTagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePositiveTagDto) {
    return this.positiveTagsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.positiveTagsService.remove(id);
  }
}
