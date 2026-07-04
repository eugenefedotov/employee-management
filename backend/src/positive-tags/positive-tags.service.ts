import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PositiveTag, PositiveTagDocument } from './schemas/positive-tag.schema';
import { CreatePositiveTagDto } from './dto/create-positive-tag.dto';
import { UpdatePositiveTagDto } from './dto/update-positive-tag.dto';

@Injectable()
export class PositiveTagsService {
  constructor(
    @InjectModel(PositiveTag.name)
    private positiveTagModel: Model<PositiveTagDocument>,
  ) {}

  create(dto: CreatePositiveTagDto) {
    const tag = new this.positiveTagModel(dto);
    return tag.save();
  }

  findAll() {
    return this.positiveTagModel.find().exec();
  }

  async findOne(id: string) {
    const tag = await this.positiveTagModel.findById(id).exec();

    if (!tag) {
      throw new NotFoundException(`Positive tag with id "${id}" not found`);
    }

    return tag;
  }

  async update(id: string, dto: UpdatePositiveTagDto) {
    const tag = await this.positiveTagModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!tag) {
      throw new NotFoundException(`Positive tag with id "${id}" not found`);
    }

    return tag;
  }

  async remove(id: string) {
    const tag = await this.positiveTagModel.findByIdAndDelete(id).exec();

    if (!tag) {
      throw new NotFoundException(`Positive tag with id "${id}" not found`);
    }
  }
}
