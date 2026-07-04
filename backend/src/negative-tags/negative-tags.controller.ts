import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NegativeTagsService } from './negative-tags.service';
import { CreateNegativeTagDto } from './dto/create-negative-tag.dto';
import { UpdateNegativeTagDto } from './dto/update-negative-tag.dto';

@Controller('negative-tags')
export class NegativeTagsController {
  constructor(private negativeTagsService: NegativeTagsService) {}

  @Post()
  create(@Body() dto: CreateNegativeTagDto) {
    return this.negativeTagsService.create(dto);
  }

  @Get()
  findAll() {
    return this.negativeTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.negativeTagsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNegativeTagDto,
  ) {
    return this.negativeTagsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.negativeTagsService.remove(id);
  }
}
