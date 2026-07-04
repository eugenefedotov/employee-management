import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NegativeTag, NegativeTagDocument } from './schemas/negative-tag.schema';
import { CreateNegativeTagDto } from './dto/create-negative-tag.dto';
import { UpdateNegativeTagDto } from './dto/update-negative-tag.dto';
import { CountersService } from '../counters/counters.service';

const NEGATIVE_TAG_COUNTER = 'negativeTagId';

@Injectable()
export class NegativeTagsService {
  constructor(
    @InjectModel(NegativeTag.name)
    private negativeTagModel: Model<NegativeTagDocument>,
    private countersService: CountersService,
  ) {}

  async create(dto: CreateNegativeTagDto) {
    const _id = await this.countersService.getNextSequence(
      NEGATIVE_TAG_COUNTER,
    );
    const tag = new this.negativeTagModel({ _id, ...dto });
    return tag.save();
  }

  findAll() {
    return this.negativeTagModel.find().exec();
  }

  async findOne(id: number) {
    const tag = await this.negativeTagModel.findById(id).exec();

    if (!tag) {
      throw new NotFoundException(`Negative tag with id "${id}" not found`);
    }

    return tag;
  }

  async update(id: number, dto: UpdateNegativeTagDto) {
    const tag = await this.negativeTagModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!tag) {
      throw new NotFoundException(`Negative tag with id "${id}" not found`);
    }

    return tag;
  }

  async remove(id: number) {
    const tag = await this.negativeTagModel.findByIdAndDelete(id).exec();

    if (!tag) {
      throw new NotFoundException(`Negative tag with id "${id}" not found`);
    }
  }
}
